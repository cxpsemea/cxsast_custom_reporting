import { format as formatString } from 'util';
import DataService from '../../services/DataService/DataService';
import { IScanSummaryData } from './IScanSummaryData';
import { LoggerService, XmlParsingService, ConfigurationService } from '../../services';
import { QUERY_PROJECT_DETAILS, QUERY_PROJECT_STATUS, RESPONSE_TEMPLATE } from './constants';
import ScanSummaryError from './ScanSummaryError';

const cnf = ConfigurationService.getConfig();
const log = LoggerService.getLogger('ScanSummary');
const xml = XmlParsingService.getInstance();

const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchData = async (scanId: number): Promise<any> => {
    const ds = DataService.getInstance();

    try {
        await ds.connect();

        const scanSummaryQueryResult = (await ds.executeQuery(formatString(QUERY_PROJECT_DETAILS, scanId))) as any[];
        log.debug('retrieved from database %j', scanSummaryQueryResult);

        if (!scanSummaryQueryResult.length) {
            throw new ScanSummaryError(ScanSummaryError.MISSING_SCAN_DETAILS, scanId);
        }
        // const scanTotalsQueryResult = (await ds.executeQuery(formatString(QUERY_PROJECT_STATUS, scanId))) as any[];
        const scanTotalsQueryResult = (await ds.executeGetCompareScansSummary(scanId as number, scanId as number)) as any[];
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
        throw new ScanSummaryError(ScanSummaryError.MISSING_ARGUMENT_XMLREPORT);
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
