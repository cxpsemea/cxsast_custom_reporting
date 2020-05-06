import BaseError, { IErrorTemplate } from '../../../common/BaseError'

/**
 * implements structured errors related to configuration problems
 */
export default class PdfError extends BaseError {
  public static GENERAL_ERROR: IErrorTemplate = {
    code: 'SE_GENERAL_ERROR',
    message: 'General error ocurred while generating a pdf file. Main reason was "%s"',
  }

  constructor(template: IErrorTemplate, ...args: any) {
    super(template, ...args)
  }
}
