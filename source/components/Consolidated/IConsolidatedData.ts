type Severities = 'high' | 'medium' | 'low' | 'info'
type States = 'confirmed' | 'notExploitable' | 'proposedNotExploitable' | 'toVerify' | 'urgent'
type Status = 'new' | 'fixed' | 'recurrent'

interface IScanResultsByStatus {
  fixed: number
  new: number
  recurrent: number
}

interface IScanResultsByStatus {
  fixed: number
  new: number
  recurrent: number
}

// commun combinedResults and scan
interface IResultTotals {
  bySeverity: { [severity in Severities]: number }
  byState: { [state in States]: number }
  byStatus: IScanResultsByStatus
  total: number
}

// Specific for the scan
interface IScanResultTotals extends IResultTotals {
  stateBySeverity: {
    [severity in Severities]: any
  }
  totalWithNotExploitable: number
  severityTotalsWithNotExploitable: { [severity in Severities]: number }
}

interface ICombinedResultDetails {
  scanFiles: number
  scanLoc: number
  scanLocFailed?: number
  scanPreset?: string
  scanRisk: number
}

interface ICombinedResults extends IResultTotals, ICombinedResultDetails {
  scanProjects: number
  vulnerabilities: any // TODO: add vulnerability types
}

// exported main types
export interface IConsolidatedData {
  appName: string
  combinedResults: ICombinedResults
  generatedAt: string
  scans: IScan[]
  year: string
}

export interface IScan {
  id: number
  openedAt: string
  projectName?: string
  scanTotals: IScanResultTotals
}

export interface IProject {
  id: number
  lastScanId: number
  name: string
  openedAt: string
  productVersion: string
  scanFiles: number
  scanLoc: number
  scanLocFailed: number
  scanPreset: string
  scanRisk: number
  scanType: string
}

export interface IStateQueryResult {
  queryName: string
  severity: number
  severityLabel: Severities
  state: States
}

export interface IScanTotalsCompare {
  fixed: number
  new: number
  recurrent: number
  severity: Severities
}
