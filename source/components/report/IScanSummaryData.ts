interface IScanResultStatusItem {
    high: number;
    medium: number;
    low: number;
    info: number;
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
    scanTotals: {
        bySeverity: {
            high: number;
            medium: number;
            low: number;
            info: number;
        };
        byStatus: {
            new: number;
            fixed: number;
            recurrent: number;
        };
    };
    scanResultStatus: {
        new: IScanResultStatusItem;
        fixed: IScanResultStatusItem;
        recurrent: IScanResultStatusItem;
        total: IScanResultStatusItem;
    };
}
