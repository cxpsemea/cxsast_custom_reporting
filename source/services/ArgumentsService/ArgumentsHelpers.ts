import { resolve as resolvePath, join as joinPath } from 'path'
import { ConfigurationService } from '../../services'

import { isEmail, isEmpty, isFile } from '../../common/Validator'
import ArgumentsError from './error/ArgumentsError'
import {
  ARGS_PROJECT_NAME,
  ARGS_PROJECT_NAME_PATTERN,
  ARGS_PROJECT_XML_REPORT,
  ARGS_REPORT_AUDIENCE,
  ARGS_REPORT_TEMPLATE,
  ARGS_REPORT_TYPE,
  DEFAULT_FOLDER_TEMPLATES,
  DEFAULT_REPORT_TYPE,
  REPORT_TEMPLATES_BY_TYPE,
  REPORT_TYPES,
  REPORT_TYPE_CONSOLIDATED,
  REPORT_TYPE_SCANSUMMARY,
} from '../../common/Constants'

const requiredFields: string[] = [ARGS_REPORT_TEMPLATE]

export const argumentsSanitizer = (argv: any) => {
  // set the default report type
  if (isEmpty(argv[ARGS_REPORT_TYPE])) {
    argv[ARGS_REPORT_TYPE] = DEFAULT_REPORT_TYPE
  }

  // convert audience into an array of strings
  argv[ARGS_REPORT_AUDIENCE] = !isEmpty(argv[ARGS_REPORT_AUDIENCE]) ? argv[ARGS_REPORT_AUDIENCE].split(',') : ''

  // set the default template according to the report type
  if (isEmpty(argv[ARGS_REPORT_TEMPLATE])) {
    argv[ARGS_REPORT_TEMPLATE] = REPORT_TEMPLATES_BY_TYPE[argv[ARGS_REPORT_TYPE]]
  }

  // set the template fill full path
  argv[ARGS_REPORT_TEMPLATE] = resolvePath(joinPath(DEFAULT_FOLDER_TEMPLATES, `${argv[ARGS_REPORT_TEMPLATE]}.html`))
}

export const argumentsValidator = (argv: any) => {
  const selectedReportType: string = argv[ARGS_REPORT_TYPE]
  const config = ConfigurationService.getConfig()

  // validation if is summary type
  if (selectedReportType === REPORT_TYPE_SCANSUMMARY) {
    requiredFields.push(String(ARGS_PROJECT_XML_REPORT))

    // check if the xml file exists in case of a summary report type
    if (!isFile(argv[ARGS_PROJECT_XML_REPORT])) {
      throw new ArgumentsError(
        ArgumentsError.INVALID_ARGUMENT_KEY,
        ARGS_PROJECT_XML_REPORT,
        `The specified xml file does not exist in ${argv[ARGS_PROJECT_XML_REPORT]}`
      )
    }
    // validation if is consolidated type
  } else if (selectedReportType === REPORT_TYPE_CONSOLIDATED) {
    if (isEmpty(argv[ARGS_PROJECT_NAME_PATTERN])) {
      throw new ArgumentsError(ArgumentsError.MISSING_ARGUMENT_KEY, ARGS_PROJECT_NAME_PATTERN)
    }

    if (isEmpty(argv[ARGS_PROJECT_NAME])) {
      throw new ArgumentsError(ArgumentsError.MISSING_ARGUMENT_KEY, ARGS_PROJECT_NAME)
    }
  }

  // make reportAudience required only if there isn't a pdf outputPath configured
  if (!config.pdf || config.pdf.outputPath === 'null') {
    requiredFields.push(String(ARGS_REPORT_AUDIENCE))
  }

  // validate all required fields
  requiredFields.forEach((field) => {
    if (isEmpty(argv[field])) {
      throw new ArgumentsError(ArgumentsError.MISSING_ARGUMENT_KEY, field)
    }
  })

  // validate the report type
  if (!REPORT_TYPES.includes(selectedReportType)) {
    throw new ArgumentsError(
      ArgumentsError.INVALID_ARGUMENT_KEY,
      ARGS_REPORT_TYPE,
      `${selectedReportType} is not a valid report type`
    )
  }

  // validate all email addresses from the ARGS_REPORT_AUDIENCE field
  if (!isEmpty(argv[ARGS_REPORT_AUDIENCE])) {
    argv[ARGS_REPORT_AUDIENCE].forEach((email: string) => {
      if (!isEmail(email)) {
        throw new ArgumentsError(
          ArgumentsError.INVALID_ARGUMENT_KEY,
          ARGS_REPORT_AUDIENCE,
          `invalid email address: ${email}`
        )
      }
    })
  }

  // check if the file exists on the templates folder
  if (!isFile(argv[ARGS_REPORT_TEMPLATE])) {
    throw new ArgumentsError(
      ArgumentsError.INVALID_ARGUMENT_KEY,
      ARGS_REPORT_TEMPLATE,
      `The specified template file does not exist in ${argv[ARGS_REPORT_TEMPLATE]}`
    )
  }
}
