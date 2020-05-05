import { join as joinPath } from 'path'

interface IStringTMap<T> {
  [key: string]: T
}

// Arguments
export const REPORT_TYPE_SCANSUMMARY = 'scanSummary'
export const REPORT_TYPE_CONSOLIDATED = 'consolidated'

export const ARGS_REPORT_TYPE = 'reportType'
export const ARGS_REPORT_TEMPLATE = 'reportTemplate'
export const ARGS_REPORT_AUDIENCE = 'reportAudience'
export const ARGS_PROJECT_XML_REPORT = 'projectXmlReport'
export const ARGS_PROJECT_NAME_PATTERN = 'projectNamePattern'
export const ARGS_PROJECT_NAME = 'projectName'

// Defaults
export const DEFAULT_FOLDER_CONFIGURATION = `${joinPath(process.cwd(), 'config')}`
export const DEFAULT_FOLDER_TEMPLATES = `${joinPath(DEFAULT_FOLDER_CONFIGURATION, 'templates')}`
export const DEFAULT_REPORT_TYPE = REPORT_TYPE_SCANSUMMARY

// Templates
export const REPORT_TYPE_SCANSUMMARY_DEFAULT_TEMPLATE = REPORT_TYPE_SCANSUMMARY
export const REPORT_TYPE_CONSOLIDATED_DEFAULT_TEMPLATE = REPORT_TYPE_CONSOLIDATED

// Configuration
export const CONFIG_FILE = `${joinPath(DEFAULT_FOLDER_CONFIGURATION, 'config.ini')}`
export const CONFIG_FILE_KEY_DATABASE_HOST = 'database.host'
export const CONFIG_FILE_KEY_DATABASE_PORT = 'database.port'
export const CONFIG_FILE_KEY_DATABASE_USERNAME = 'database.username'
export const CONFIG_FILE_KEY_DATABASE_PASSWORD = 'database.password'
export const CONFIG_FILE_KEY_SMTP_HOST = 'smtp.host'
export const CONFIG_FILE_KEY_SMTP_PORT = 'smtp.port'
export const CONFIG_FILE_KEY_SMTP_USERNAME = 'smtp.username'
export const CONFIG_FILE_KEY_SMTP_PASSWORD = 'smtp.password'
export const CONFIG_FILE_KEY_SMTP_SENDER = 'smtp.sender'
export const CONFIG_FILE_KEY_LOGGER_LEVEL = 'logger.level'
export const CONFIG_FILE_KEY_PDF_PATH = 'pdf.outputPath'

export const REPORT_TEMPLATES_BY_TYPE: IStringTMap<string> = {
  [REPORT_TYPE_SCANSUMMARY]: REPORT_TYPE_SCANSUMMARY_DEFAULT_TEMPLATE,
  [REPORT_TYPE_CONSOLIDATED]: REPORT_TYPE_CONSOLIDATED_DEFAULT_TEMPLATE,
}

export const REPORT_TYPES: string[] = [REPORT_TYPE_CONSOLIDATED, REPORT_TYPE_SCANSUMMARY]
