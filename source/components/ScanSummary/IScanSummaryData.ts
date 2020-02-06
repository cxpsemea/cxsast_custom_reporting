interface IScanResultsBySeverity {
    high: number;
    medium: number;
    low: number;
    info: number;
}

interface IScanResultsByStatus {
    new: number;
    fixed: number;
    recurrent: number;
}

interface IScanResultTotals {
    bySeverity: IScanResultsBySeverity;
    byStatus: IScanResultsByStatus;
    total: number;
}

interface IScanResultStatus {
    new: IScanResultsBySeverity;
    fixed: IScanResultsBySeverity;
    recurrent: IScanResultsBySeverity;
    total: IScanResultsBySeverity;
}

export interface IScanSummaryData {
    productVersion: string;
    projectId: number;
    projectName: string;
    scanId: number;
    scanType: 'Incremental' | 'FullScan';
    scanRisk: number;
    scanLoc: number;
    scanLocFailed: number;
    scanFiles: number;
    scanPreset: string;
    scanTotals: IScanResultTotals;
    scanResultStatus: IScanResultStatus;
}
