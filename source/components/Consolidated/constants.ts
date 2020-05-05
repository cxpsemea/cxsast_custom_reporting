import { IScan, IConsolidatedData } from './IConsolidatedData'

export const QUERY_PROJECT_DETAILS = `
SELECT
    ScanDetails.ProductVersion as "productVersion",
    CAST(Project.Id as int) as "id",
    Project.Name as name,
    Project.OpenedAt as "openedAt",
    CAST(Scan.Id as int) as "lastScanId",
    (SELECT CASE ScanType WHEN 1 THEN 'Full Scan' END) as "scanType",
    ScanDetails.PresetName as "scanPreset",
    CAST(Scan.RiskLevel as int)  as "scanRisk",
    CAST(ScanDetails.LOC as int) as "scanLoc",
    CAST(ScanDetails.FailedLOC as int) as "scanLocFailed",
    CAST(ScanDetails.FilesCount as int) "scanFiles"
FROM CxDB.dbo.Projects Project
      INNER JOIN CxDB.dbo.TaskScans Scan ON  Scan.ProjectId = Project.Id
      INNER JOIN CxDB.dbo.TaskScanEnvironment ScanDetails on ScanDetails.ScanId = Scan.Id
WHERE Scan.Id IN (
  SELECT
      MAX(Scan.Id)
    FROM CxDB.dbo.Projects Project
      INNER JOIN CxDB.dbo.TaskScans Scan ON  Scan.ProjectId = Project.Id
    WHERE Project.Name LIKE '%s'
      AND Project.is_deprecated = 0
      AND Project.Owning_Team IN (SELECT TeamId
      from CxDB.dbo.Teams)
    GROUP BY Project.Id
)
`

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
`

export const QUERY_SCAN_STATES_AND_QUERIES = `
    SELECT 
        Date as date,
		    Name as queryName,
        Result.Severity as severity,
        (SELECT CASE Result.Severity WHEN 3 THEN 'high' WHEN 2 THEN 'medium' WHEN 1 THEN 'low' WHEN 0 THEN 'info' END) as 'severityLabel',
        (SELECT CASE State WHEN 0 THEN 'toVerify' WHEN 1 THEN 'notExploitable' WHEN 2 THEN 'confirmed' WHEN 3 THEN 'urgent' WHEN 4 THEN 'proposedNotExploitable' END) as 'state' 
    FROM CxDB.CxEntities.Result Result
	      INNER JOIN CxDB.dbo.QueryVersion Query ON  Query.QueryVersionCode = QueryVersionId
    WHERE ScanId = %s
`

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
`

export const CONSOLIDATED_DATA_TEMPLATE: IConsolidatedData = {
  appName: '',
  generatedAt: '',
  year: '',
  combinedResults: {
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
    byState: {
      toVerify: 0,
      urgent: 0,
      confirmed: 0,
      notExploitable: 0,
      proposedNotExploitable: 0,
    },
    scanRisk: 0,
    scanLoc: 0,
    scanFiles: 0,
    scanProjects: 0,
    vulnerabilities: {},
    total: 0,
  },
  scans: [],
}

export const SCAN_TEMPLATE: IScan = {
  id: 0,
  openedAt: '',
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
    byState: {
      toVerify: 0,
      urgent: 0,
      confirmed: 0,
      notExploitable: 0,
      proposedNotExploitable: 0,
    },
    stateBySeverity: {
      high: {
        toVerify: 0,
        urgent: 0,
        confirmed: 0,
        notExploitable: 0,
        proposedNotExploitable: 0,
      },
      medium: {
        toVerify: 0,
        urgent: 0,
        confirmed: 0,
        notExploitable: 0,
        proposedNotExploitable: 0,
      },
      low: {
        toVerify: 0,
        urgent: 0,
        confirmed: 0,
        notExploitable: 0,
        proposedNotExploitable: 0,
      },
      info: {
        toVerify: 0,
        urgent: 0,
        confirmed: 0,
        notExploitable: 0,
        proposedNotExploitable: 0,
      },
    },
    total: 0,
    totalWithNotExploitable: 0,
    severityTotalsWithNotExploitable: {
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  },
}
