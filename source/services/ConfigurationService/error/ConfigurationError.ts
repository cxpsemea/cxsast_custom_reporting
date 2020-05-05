import BaseError, { IErrorTemplate } from '../../../common/BaseError'

/**
 * implements structured errors related to configuration problems
 */
export default class ConfigurationError extends BaseError {
  public static MISSING_CONFIG_FILE: IErrorTemplate = {
    code: 'CO_MISSING_CONFIG_FILE',
    message: 'Missing configuration file. Could not access file on "%s"',
  }

  public static MISSING_CONFIG_KEY: IErrorTemplate = {
    code: 'CO_MISSING_CONFIG_KEY',
    message: 'Missing configuration key "%s"',
  }

  public static INVALID_CONFIG_KEY: IErrorTemplate = {
    code: 'CO_INVALID_CONFIG_KEY',
    message: 'Invalid configuration key "%s"',
  }

  public static MISSING_VERSION: IErrorTemplate = {
    code: 'CO_MISSING_VERSION',
    message: 'Could not determine application version',
  }

  constructor(template: IErrorTemplate, ...args: any) {
    super(template, ...args)
  }
}
