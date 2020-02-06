import { join as joinPath } from 'path';

export const FILE_VERSION = `${joinPath(process.cwd(), '.version')}`;

export const DEFAULT_FOLDER_CONFIGURATION = `${joinPath(process.cwd(), 'config')}`;
export const DEFAULT_FOLDER_TEMPLATES = `${joinPath(DEFAULT_FOLDER_CONFIGURATION, 'templates')}`;

export const REPORT_TYPE_SCANSUMMARY = 'ScanSummary';
export const REPORT_TYPE = [REPORT_TYPE_SCANSUMMARY];
export const REPORT_TYPE_SCANSUMMARY_DEFAULT_TEMPLATE = REPORT_TYPE_SCANSUMMARY;

export const DEFAULT_REPORT_TYPE = REPORT_TYPE_SCANSUMMARY;

export const CONFIG_ARGS_REPORT_TYPE = 'reportType';
export const CONFIG_ARGS_REPORT_TEMPLATE = 'reportTemplate';
export const CONFIG_ARGS_REPORT_AUDIENCE = 'reportAudience';
export const CONFIG_ARGS_PROJECT_XML_REPORT = 'projectXmlReport';

export const CONFIG_FILE = `${joinPath(DEFAULT_FOLDER_CONFIGURATION, 'config.ini')}`;
export const CONFIG_FILE_KEY_DATABASE_HOST = 'database.host';
export const CONFIG_FILE_KEY_DATABASE_PORT = 'database.port';
export const CONFIG_FILE_KEY_DATABASE_USERNAME = 'database.username';
export const CONFIG_FILE_KEY_DATABASE_PASSWORD = 'database.password';
export const CONFIG_FILE_KEY_SMTP_HOST = 'smtp.host';
export const CONFIG_FILE_KEY_SMTP_PORT = 'smtp.port';
export const CONFIG_FILE_KEY_SMTP_USERNAME = 'smtp.username';
export const CONFIG_FILE_KEY_SMTP_PASSWORD = 'smtp.password';
export const CONFIG_FILE_KEY_SMTP_SENDER = 'smtp.sender';
export const CONFIG_FILE_KEY_LOGGER_LEVEL = 'logger.level';
