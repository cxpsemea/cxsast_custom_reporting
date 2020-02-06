import BaseError, { IErrorTemplate } from '../../common/BaseError';

export default class ScanSummaryError extends BaseError {
    public static MISSING_ARGUMENT_XMLREPORT: IErrorTemplate = {
        code: 'MISSING_SCAN_DETAILS',
        message: 'missing argument "xmlReport"',
    };

    public static MISSING_SCAN_DETAILS: IErrorTemplate = {
        code: 'MISSING_SCAN_DETAILS',
        message: 'Could not retrieve scan details for Scanid=%s',
    };

    constructor(template: IErrorTemplate, ...args: any) {
        super(template, ...args);
    }
}
