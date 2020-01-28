import DataService from '../../services/DataService/DataService';
import { IScanSummaryData } from './IScanSummaryData';
import { LoggerService } from '../../services';

const log = LoggerService.getLogger('ScanSummary');

const QUERY_1 = `
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
		Project.id = 31
    AND Scan.Id = 1000091;
`;

const QUERY_2 = `
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
    Project.id = 31
    AND ScanStatistics.ScanId = 1000091
GROUP BY
    Query.Severity
ORDER BY
    Query.Severity DESC;
`;

const summaryReport = async (): Promise<IScanSummaryData> => {
    let returnData: IScanSummaryData = {
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
        },
        scanResultStatus: {
            new: { high: 0, medium: 0, low: 0, info: 0 },
            fixed: { high: 0, medium: 0, low: 0, info: 0 },
            recurrent: { high: 0, medium: 0, low: 0, info: 0 },
            total: { high: 0, medium: 0, low: 0, info: 0 },
        },
    };

    const ds = DataService.getInstance();

    await ds.connect();

    const scanSummaryQueryResult = (await ds.executeQuery(QUERY_1)) as any[];
    log.debug('retrieved from database %j', scanSummaryQueryResult);

    const scanTotalsQueryResult = (await ds.executeQuery(QUERY_2)) as any[];
    log.debug('retrieved from database %j', scanTotalsQueryResult);

    await ds.disconnect();

    returnData = { ...returnData, ...scanSummaryQueryResult[0] };

    // [
    //     { severity: 'High', new: 28, fixed: 0, recurrent: 1 },
    //     { severity: 'Medium', new: 28, fixed: 0, recurrent: 0 },
    //     { severity: 'Low', new: 32, fixed: 0, recurrent: 6 },
    // ];

    scanTotalsQueryResult.forEach((item: { severity: string; new: number; fixed: number; recurrent: number }) => {
        returnData.scanTotals.byStatus.new += item.new;
        returnData.scanTotals.byStatus.fixed += item.fixed;
        returnData.scanTotals.byStatus.recurrent += item.recurrent;

        switch (item.severity) {
            case 'high':
                returnData.scanTotals.bySeverity.high = item.new + item.recurrent;
                returnData.scanResultStatus.new.high = item.new;
                returnData.scanResultStatus.fixed.high = item.fixed;
                returnData.scanResultStatus.recurrent.high = item.recurrent;
                returnData.scanResultStatus.total.high = item.new + item.recurrent;
                break;
            case 'medium':
                returnData.scanTotals.bySeverity.medium = item.new + item.recurrent;
                returnData.scanResultStatus.new.medium = item.new;
                returnData.scanResultStatus.fixed.medium = item.fixed;
                returnData.scanResultStatus.recurrent.medium = item.recurrent;
                returnData.scanResultStatus.total.medium = item.new + item.recurrent;
                break;
            case 'low':
                returnData.scanTotals.bySeverity.low = item.new + item.recurrent;
                returnData.scanResultStatus.new.low = item.new;
                returnData.scanResultStatus.fixed.low = item.fixed;
                returnData.scanResultStatus.recurrent.low = item.recurrent;
                returnData.scanResultStatus.total.low = item.new + item.recurrent;
                break;
            case 'info':
                returnData.scanTotals.bySeverity.info = item.new + item.recurrent;
                returnData.scanResultStatus.new.info = item.new;
                returnData.scanResultStatus.fixed.info = item.fixed;
                returnData.scanResultStatus.recurrent.info = item.recurrent;
                returnData.scanResultStatus.total.info = item.new + item.recurrent;
                break;
        }
    });

    log.debug('returning %j', returnData);
    log.info('finished retrieving data');

    return Promise.resolve(returnData);
};

export { summaryReport };
