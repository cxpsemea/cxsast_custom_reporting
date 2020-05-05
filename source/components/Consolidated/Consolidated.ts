import { orderBy, cloneDeep } from 'lodash'
import dateFormat from 'dateformat'
import DataService from '../../services/DataService/DataService'
import { IProject, IConsolidatedData, IScan, IStateQueryResult, IScanTotalsCompare } from './IConsolidatedData'
import { LoggerService, ArgumentsService } from '../../services'
import { CONSOLIDATED_DATA_TEMPLATE, SCAN_TEMPLATE } from './constants'
import { getSelectedProjects, getPreviousScanId, getScansCompareTotals, getScanStates } from './dataFetchers'

const args = ArgumentsService.getArgs()
const log = LoggerService.getLogger('Consolidated')

const fetchData = async (): Promise<any> => {
  const ds = DataService.getInstance()
  const { namePattern, name } = args.project!
  const consolidatedData: IConsolidatedData = CONSOLIDATED_DATA_TEMPLATE

  try {
    await ds.connect()

    const selectedProjects = await getSelectedProjects(namePattern!, ds)

    await Promise.all(
      selectedProjects.map(async (project: IProject) => {
        const scan: IScan = cloneDeep(SCAN_TEMPLATE)

        const previousScanId = await getPreviousScanId(project, ds)
        const compareTotals = await getScansCompareTotals(project.lastScanId, previousScanId, ds)
        const scanStates = await getScanStates(project.lastScanId, ds)

        // COMBINED: results
        consolidatedData.combinedResults.scanRisk = Math.max(
          consolidatedData.combinedResults.scanRisk,
          project.scanRisk
        )
        consolidatedData.combinedResults.scanLoc += project.scanLoc
        consolidatedData.combinedResults.scanFiles += project.scanFiles

        // set the scans array
        scan.id = project.lastScanId
        scan.openedAt = dateFormat(project.openedAt, 'dd/mm/yy, h:MM:ss TT')
        scan.projectName = project.name

        scanStates.forEach(({ state, queryName, severity, severityLabel }: IStateQueryResult) => {
          consolidatedData.combinedResults.byState[state]++
          scan.scanTotals.byState[state]++

          // SCAN: set state by severity
          scan.scanTotals.stateBySeverity[severityLabel][state]++

          // COMBINED: set vulnerabilities
          if (state !== 'notExploitable') {
            // remove not exploitable results from the vulnerabilities
            const key = queryName.toLowerCase()

            consolidatedData.combinedResults.total++

            consolidatedData.combinedResults.vulnerabilities[key]
              ? consolidatedData.combinedResults.vulnerabilities[key].occurrences++
              : (consolidatedData.combinedResults.vulnerabilities[key] = {
                  occurrences: 1,
                  severity,
                  severityLabel,
                  name: queryName.split('_').join(' '),
                })
          }

          scan.scanTotals.severityTotalsWithNotExploitable[severityLabel]++
        })

        compareTotals.forEach((result: IScanTotalsCompare) => {
          // COMBINED: results
          consolidatedData.combinedResults.bySeverity[result.severity] += result.new + result.recurrent
          consolidatedData.combinedResults.byStatus.new += result.new
          consolidatedData.combinedResults.byStatus.fixed += result.fixed
          consolidatedData.combinedResults.byStatus.recurrent += result.recurrent

          // by severity
          scan.scanTotals.bySeverity[result.severity] = result.new + result.recurrent

          // by status
          scan.scanTotals.byStatus.new += result.new
          scan.scanTotals.byStatus.fixed += result.fixed
          scan.scanTotals.byStatus.recurrent += result.recurrent
        })

        scan.scanTotals.total = scan.scanTotals.byStatus.new + scan.scanTotals.byStatus.recurrent
        scan.scanTotals.totalWithNotExploitable = scanStates.length

        consolidatedData.scans.push(scan)
      })
    )

    await ds.disconnect()

    consolidatedData.appName = name!
    consolidatedData.combinedResults.scanProjects = selectedProjects.length

    consolidatedData.combinedResults.vulnerabilities = orderBy(
      consolidatedData.combinedResults.vulnerabilities,
      ['severity', 'occurrences', 'name'],
      ['desc', 'desc', 'asc']
    )

    return consolidatedData
  } catch (error) {
    log.warn('Could not retrieve data: "%s"', error.message)
  }
}

const consolidatedReport = async (): Promise<IConsolidatedData> => {
  const consolidatedData: IConsolidatedData = await fetchData()

  if (consolidatedData && Object.keys(consolidatedData).length) {
    const today = new Date()
    consolidatedData.generatedAt = dateFormat(today, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
    consolidatedData.year = dateFormat(today, 'yyyy')

    log.info('finished retrieving data for the selected projects')
  }

  return consolidatedData
}

export { consolidatedReport }
