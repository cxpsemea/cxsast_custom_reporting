import DataServiceImpl from './DataServiceImpl'
import { Severities, States } from '../../components/Consolidated/IConsolidatedData'

export interface IReportResult {
  queryVersionCode: number
  severity: number
  severityLabel: Severities
  state: States
  pathId: number
}

export interface IQueryReport {
  id: number
  versionCode: number
  name: string
  severity: number
}

export interface IDataService {
  connect(): Promise<void>
  disconnect(): Promise<void>
  executeQuery(query: string): Promise<any>
  executeGetCompareScansSummary(newScan: number, oldScan: number): Promise<any>
  executeGetScanReportResults(scanId: number): Promise<[IReportResult]>
  executeGetScanReportQueriesData(scanId: number): Promise<[IQueryReport]>
}

let instance: IDataService

export default class DataService {
  public static getInstance(): IDataService {
    if (!instance) {
      instance = new DataServiceImpl()
    }
    return instance
  }
}
