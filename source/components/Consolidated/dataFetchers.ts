import ConsolidatedError from './ConsolidatedError'
import { format as formatString } from 'util'
import { QUERY_PREVIOUS_SCAN_ID, QUERY_PROJECT_DETAILS, QUERY_SCAN_STATES_AND_QUERIES } from './constants'
import { IProject } from './IConsolidatedData'
import { LoggerService } from '../../services'

const log = LoggerService.getLogger('Consolidated Data Fetchers')

export const getSelectedProjects = async (namePattern: string, ds: any): Promise<IProject[]> => {
  // NOTE: this query does not include projects without scans
  const selectedProjects = await ds.executeQuery(formatString(QUERY_PROJECT_DETAILS, namePattern))

  if (!selectedProjects || !selectedProjects.length) {
    throw new ConsolidatedError(ConsolidatedError.MISSING_PROJECT_WITH_NAME_PATTERN, namePattern)
  }

  log.info('found %s projects with scans matching the provided namePattern of %s', selectedProjects.length, namePattern)

  return selectedProjects
}

export const getPreviousScanId = async (project: IProject, ds: any) => {
  if (project.lastScanId) {
    const previousScanIdQueryResult = await ds.executeQuery(
      formatString(QUERY_PREVIOUS_SCAN_ID, project.id, project.lastScanId)
    )

    const previousScanId: number = previousScanIdQueryResult.length
      ? previousScanIdQueryResult[0].scanId
      : project.lastScanId

    log.info('retrieved previous scan id from database %s', previousScanId)

    return previousScanId
  }

  throw new ConsolidatedError(ConsolidatedError.NO_AVAILABLE_SCANS)
}

export const getScansCompareTotals = async (lastScanId: number, previousScanId: number, ds: any) => {
  const scanTotalsQueryResult = await ds.executeGetCompareScansSummary(
    lastScanId,
    previousScanId !== lastScanId ? previousScanId : 0
  )

  log.info('retrieved the compare between the last scan and the previous scan  %s - %s', lastScanId, previousScanId)

  return scanTotalsQueryResult
}

export const getScanStates = async (lastScanId: number, ds: any) => {
  const scanStatesQueryResult = await ds.executeQuery(formatString(QUERY_SCAN_STATES_AND_QUERIES, lastScanId))

  log.debug('retrieved the states from database for the scan %s', lastScanId)

  return scanStatesQueryResult
}
