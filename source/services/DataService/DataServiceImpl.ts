import * as mssql from 'mssql'
import { IDataService } from './DataService'
import { LoggerService } from '../LoggerService'
import { ConfigurationService } from '../ConfigurationService'

interface IQueryResult {
  recordsets: any[]
  recordset: any[]
  output: any
  rowsAffected: number[]
}

const log = LoggerService.getLogger('DataServiceImpl')
const cnf = ConfigurationService.getConfig()

export default class DataServiceImpl implements IDataService {
  private pool: mssql.ConnectionPool
  private connection: any

  constructor() {
    this.pool = new mssql.ConnectionPool({
      user: cnf.database.username,
      password: cnf.database.password,
      server: cnf.database.host,
      // tslint:disable-next-line: radix
      port: parseInt(cnf.database.port),
      database: 'CxDB',
      options: {
        enableArithAbort: true,
      },
    })
  }

  public async connect(): Promise<void> {
    log.debug('connecting to database')
    if (!this.connection) {
      this.connection = await this.pool.connect()
    }
    return Promise.resolve()
  }

  public async disconnect(): Promise<void> {
    await this.pool.close()
    log.debug('disconnected from database')
    return Promise.resolve()
  }

  public async executeQuery(_query: string): Promise<any[]> {
    log.debug('executing query')
    const request = await this.connection.request()
    const result = (await request.query(_query)) as IQueryResult

    if (result && result.recordset.length > 0) {
      return Promise.resolve(result.recordset)
    }
    return Promise.resolve([])
  }

  public async executeGetCompareScansSummary(newScan: number, oldScan: number): Promise<any[]> {
    const severityMapping: Map<number, string> = new Map()
    severityMapping.set(3, 'high')
    severityMapping.set(2, 'medium')
    severityMapping.set(1, 'low')
    severityMapping.set(0, 'info')

    const result = await this.connection
      .request()
      .input('NewScanId', mssql.Int, newScan)
      .input('OldScanId', mssql.Int, oldScan)
      .input('IncludeNotExploitable', mssql.Int, 0)
      .input('GroupBySeverity', mssql.Int, 1)
      .input('GroupByState', mssql.Int, 0)
      .input('GroupByQuery', mssql.Int, 0)
      .execute('GetCompareScansSummary')

    if (result && result.recordset.length > 0) {
      const response = []
      for (const item of result.recordset) {
        response.push({
          severity: severityMapping.get(item.Severity),
          new: item.New,
          fixed: item.Resolved,
          recurrent: item.Recurrent,
        })
      }
      return Promise.resolve(response)
    }

    return Promise.resolve([])
  }

  public async executeGetScanReportResults(scanId: number) {
    const severityMapping: Map<number, string> = new Map()
    const stateMapping: Map<number, string> = new Map()

    severityMapping.set(3, 'high')
    severityMapping.set(2, 'medium')
    severityMapping.set(1, 'low')
    severityMapping.set(0, 'info')

    stateMapping.set(4, 'proposedNotExploitable')
    stateMapping.set(3, 'urgent')
    stateMapping.set(2, 'confirmed')
    stateMapping.set(1, 'notExploitable')
    stateMapping.set(0, 'toVerify')

    const result = (
      await this.connection
        .request()
        .input('ScanID', mssql.Int, scanId)
        .input('QueriesFilter', mssql.Int, null)
        .input('SeveritiesFilter', mssql.Int, null)
        .input('StatesFilter', mssql.Int, null)
        .input('AssignedToFilter', mssql.Int, null)
        .input('CategoriesFilter', mssql.Int, null)
        .execute('GetScanReportResults')
    ).recordset.map((item: any) => ({
      severity: item.ResultSeverity,
      state: stateMapping.get(item.ResultState),
      queryVersionCode: item.QueryVersionCode,
      severityLabel: severityMapping.get(item.ResultSeverity),
      pathId: item.Path_Id,
    }))

    return Promise.resolve(result)
  }

  public async executeGetScanReportQueriesData(scanId: number) {
    const result = (
      await this.connection
        .request()
        .input('ScanID', mssql.Int, scanId)
        .input('LCID', mssql.Int, null)
        .input('QueriesFilter', mssql.Int, null)
        .execute('GetScanReportQueriesData')
    ).recordset.map((item: any) => ({
      id: item.QueryId,
      versionCode: item.QueryVersionCode,
      name: item.QueryName,
      severity: item.QuerySeverity,
    }))

    return Promise.resolve(result)
  }
}
