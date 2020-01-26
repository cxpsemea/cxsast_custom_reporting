import { join as joinPath } from 'path';

export const FILE_VERSION = `${joinPath(process.cwd(), '.version')}`;

export const CONFIG_FILE = `${joinPath(process.cwd(), 'config/config.ini')}`;
export const CONFIG_ARGS_REPORT_TYPE = 'reportType';
export const CONFIG_ARGS_REPORT_TEMPLATE = 'reportTemplate';
export const CONFIG_ARGS_REPORT_AUDIENCE = 'reportAudience';
export const CONFIG_FILE_KEY_SAST_URL = 'sast.url';
export const CONFIG_FILE_KEY_SAST_USERNAME = 'sast.username';
export const CONFIG_FILE_KEY_SAST_PASSWORD = 'sast.password';
export const CONFIG_FILE_KEY_SMTP_HOST = 'smtp.host';
export const CONFIG_FILE_KEY_SMTP_PORT = 'smtp.port';
export const CONFIG_FILE_KEY_SMTP_USERNAME = 'smtp.username';
export const CONFIG_FILE_KEY_SMTP_PASSWORD = 'smtp.password';
export const CONFIG_FILE_KEY_SMTP_SENDER = 'smtp.sender';
