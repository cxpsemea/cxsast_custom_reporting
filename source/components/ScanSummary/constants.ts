import { IScanSummaryData } from './IScanSummaryData';

export const QUERY_PROJECT_DETAILS = `
SELECT 
	ScanDetails.ProductVersion as "productVersion",
	CAST(Project.Id as int) as "projectId",
	Project.Name as projectName,
	CAST(Scan.Id as int) as "scanId",
	(SELECT CASE ScanType WHEN 1 THEN 'Full Scan' END) as "scanType",
	ScanDetails.PresetName as "scanPreset",
	CAST(Scan.RiskLevel as int)  as "scanRisk",
	CAST(ScanDetails.LOC as int) as "scanLoc",
	CAST(ScanDetails.FailedLOC as int) as "scanLocFailed",
	CAST(ScanDetails.FilesCount as int) "scanFiles"
FROM 
	[CxDB].[dbo].[Projects] Project
		INNER JOIN [CxDB].[dbo].[TaskScans] Scan on Scan.ProjectId = Project.Id
		INNER JOIN [CxDB].[dbo].[TaskScanEnvironment] ScanDetails on ScanDetails.ScanId = Scan.Id
WHERE
	Scan.Id = %s;
`;

export const QUERY_PROJECT_STATUS = `
SELECT
    (SELECT CASE Query.Severity WHEN 3 THEN 'high' WHEN 2 THEN 'medium' WHEN 1 THEN 'low' WHEN 0 THEN 'info' END) as "severity",
    SUM(ScanStatistics.NewResults) as "new",
    SUM(ScanStatistics.ResolvedResults) as "fixed",
    SUM(ScanStatistics.RecurrentResults) as "recurrent"
FROM
     [CxDB].[dbo].[Projects] Project
        INNER JOIN [CxDB].[dbo].[ScanStatistics] ScanStatistics on ScanStatistics.ProjectId = Project.Id
        INNER JOIN  [CxDB].[dbo].[Query] Query on Query.QueryId = ScanStatistics.QueryId
WHERE
    ScanStatistics.ScanId = %s
GROUP BY
    Query.Severity
ORDER BY
    Query.Severity DESC;
`;

export const QUERY_PREVIOUS_SCAN_ID = `
SELECT
	  Id as scanId
FROM 
	  [CxDB].[dbo].[TaskScans]
WHERE 
    ProjectId = %s
    AND Id <= %s
ORDER BY 
  	Id DESC
OFFSET 1 ROWS
FETCH NEXT 1 ROW ONLY
`;

export const RESPONSE_TEMPLATE: IScanSummaryData = {
    productVersion: '',
    projectId: 0,
    projectName: '',
    scanId: 0,
    scanType: 'FullScan',
    scanRisk: 0,
    scanLoc: 0,
    scanLocFailed: 0,
    scanFiles: 0,
    scanPreset: '',
    scanTotals: {
        bySeverity: {
            high: 0,
            medium: 0,
            low: 0,
            info: 0,
        },
        byStatus: {
            new: 0,
            fixed: 0,
            recurrent: 0,
        },
        total: 0,
    },
    scanResultStatus: {
        new: { high: 0, medium: 0, low: 0, info: 0 },
        fixed: { high: 0, medium: 0, low: 0, info: 0 },
        recurrent: { high: 0, medium: 0, low: 0, info: 0 },
        total: { high: 0, medium: 0, low: 0, info: 0 },
    },
};
