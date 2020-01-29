import BaseError, { IErrorTemplate } from '../../../common/BaseError';

/**
 * implements scturcted errors related to configuration problems
 */
export default class SmtpError extends BaseError {
    public static GENERAL_ERROR: IErrorTemplate = {
        code: 'SE_GENERAL_ERROR',
        message: 'General error ocurred while sending email. Main reason was "%s"',
    };

    constructor(template: IErrorTemplate, ...args: any) {
        super(template, ...args);
    }
}
