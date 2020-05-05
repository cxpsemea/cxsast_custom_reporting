import BaseError, { IErrorTemplate } from '../../common/BaseError'

export default class ConsolidatedError extends BaseError {
  public static MISSING_PROJECT_WITH_NAME_PATTERN: IErrorTemplate = {
    code: 'MISSING_PROJECT_WITH_NAME_PATTERN',
    message: 'there is no projects with the specified "projectNamePattern" of "%s"',
  }
  public static NO_AVAILABLE_SCANS: IErrorTemplate = {
    code: 'NO_AVAILABLE_SCANS',
    message: 'the selected project does not have any scan yet',
  }

  public static FAILED_TO_GET_SCAN_SATATUS: IErrorTemplate = {
    code: 'FAILED_TO_GET_SCAN_SATATUS',
    message: 'failed to get the scan status from the database for the scan "%"',
  }

  constructor(template: IErrorTemplate, ...args: any) {
    super(template, ...args)
  }
}
