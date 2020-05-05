import BaseError, { IErrorTemplate } from '../../../common/BaseError'

/**
 * implements structured errors related to configuration problems
 */
export default class ArgumentsError extends BaseError {
  public static MISSING_ARGUMENTS: IErrorTemplate = {
    code: 'CO_MISSING_ARGUMENTS',
    message: 'Failed to get the user input arguments',
  }

  public static MISSING_ARGUMENT_KEY: IErrorTemplate = {
    code: 'CO_MISSING_ARGUMENT',
    message: 'Missing argument "%s"',
  }

  public static INVALID_ARGUMENT_KEY: IErrorTemplate = {
    code: 'CO_INVALID_ARGUMENT',
    message: 'Invalid argument "%s". Reason "%s"',
  }

  constructor(template: IErrorTemplate, ...args: any) {
    super(template, ...args)
  }
}
