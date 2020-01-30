import DataService from '../../services/DataService/DataService';
import { IScanSummaryData } from './IScanSummaryData';
import { LoggerService, XmlParsingService, ConfigurationService } from '../../services';
import { format as formatString } from 'util';

const cnf = ConfigurationService.getConfig();
const log = LoggerService.getLogger('ScanSummary');
const xml = XmlParsingService.getInstance();

const RESPONSE_TEMPLATE: IScanSummaryData = {
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
	Scan.Id = %s;
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
    ScanStatistics.ScanId = %s
GROUP BY
    Query.Severity
ORDER BY
    Query.Severity DESC;
`;

const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchData = async (scanId: number): Promise<any> => {
    const ds = DataService.getInstance();

    try {
        await ds.connect();

        const scanSummaryQueryResult = (await ds.executeQuery(formatString(QUERY_1, scanId))) as any[];
        log.debug('retrieved from database %j', scanSummaryQueryResult);

        if (!scanSummaryQueryResult.length) {
            // TODO: throw proper exception
            throw new Error(`Could not retrieve scan details for Scanid=${scanId}`);
        }
        const scanTotalsQueryResult = (await ds.executeQuery(formatString(QUERY_2, scanId))) as any[];
        log.debug('retrieved from database %j', scanTotalsQueryResult);

        await ds.disconnect();

        const returnData = { ...RESPONSE_TEMPLATE, ...scanSummaryQueryResult[0] };

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

        returnData.scanTotals.total = returnData.scanTotals.byStatus.new + returnData.scanTotals.byStatus.recurrent;

        return returnData;
    } catch (error) {
        log.warn('Could not retrieve data for scanId=%s due "%s"', scanId, error.message);
    }
};

const fetchDataRetry = async (scanId: number, retries: number): Promise<any> => {
    try {
        if (retries >= 0) {
            log.info('Feching data for scanId=%s attempt #%s', scanId, retries);
            const scanData = await fetchData(scanId);
            log.debug('Feching data for scanId=%s attempt #%s returned %j', scanId, retries, scanData);
            if (!scanData) {
                await timeout(2000);
                return await fetchDataRetry(scanId, retries - 1);
            }
            return scanData;
        } else {
            throw Error('ABORTING');
        }
    } catch (e) {
        if (retries > 0) {
            await timeout(2000);
            return await fetchDataRetry(scanId, retries - 1);
        } else {
            log.error('Could not retrieve data for scanId=%s after several attempts', scanId);
            return undefined;
        }
    }
};

const summaryReport = async (): Promise<any> => {
    if (!cnf.project || !cnf.project.xmlReport) {
        // TODO: throw proper exception
        throw new Error('missing cnf.project.xmlReport');
    }

    const scanId = await xml.fetchScanIdAndQuit(cnf.project.xmlReport);
    const scanData = await fetchDataRetry(scanId, 4);

    log.debug('fetched scan details %j', scanData);
    if (scanData) {
        log.info('finished retrieving data for scanId=%s projectName="%s"', scanId, scanData.projectName);
    }

    return Promise.resolve(scanData);
};

export { summaryReport };
