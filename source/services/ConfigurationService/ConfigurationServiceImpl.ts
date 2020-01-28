import PropertiesReader from 'properties-reader';
import yargs from 'yargs';
import { IConfigurationService, IConfigurationObject } from './ConfigurationService';
import ConfigurationError from './error/ConfigurationError';
import { isFqdn, isIPV4 } from '../../common/Validator';
import { readFile } from '../../common/Utilities';

import {
    FILE_VERSION,
    DEFAULT_REPORT_TYPE,
    CONFIG_FILE,
    CONFIG_FILE_KEY_DATABASE_HOST,
    CONFIG_FILE_KEY_DATABASE_PORT,
    CONFIG_FILE_KEY_DATABASE_USERNAME,
    CONFIG_FILE_KEY_DATABASE_PASSWORD,
    CONFIG_FILE_KEY_SMTP_HOST,
    CONFIG_FILE_KEY_SMTP_PORT,
    CONFIG_FILE_KEY_SMTP_USERNAME,
    CONFIG_FILE_KEY_SMTP_PASSWORD,
    CONFIG_FILE_KEY_SMTP_SENDER,
    CONFIG_FILE_KEY_LOGGER_LEVEL,
} from '../../common/Constants';

export default class ConfigurationServiceImpl implements IConfigurationService {
    private props: any;
    private args: any;
    private config: IConfigurationObject;

    constructor() {
        try {
            this.props = PropertiesReader(CONFIG_FILE);
        } catch (e) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_FILE, CONFIG_FILE);
        }

        this.args = yargs.argv;

        const version = readFile(FILE_VERSION);

        const loggerLevel: string = this.props.get(CONFIG_FILE_KEY_LOGGER_LEVEL);

        const reportType = this.args.reportType ? this.args.reportType : DEFAULT_REPORT_TYPE;
        const reportTemplate = this.args.reportTemplate ? this.args.reportTemplate : 'ScanSummary';
        const reportAudience = this.args.reportAudience ? this.args.reportAudience : undefined;

        const databaseHost: string = this.props.get(CONFIG_FILE_KEY_DATABASE_HOST);
        const databasePort: string = this.props.get(CONFIG_FILE_KEY_DATABASE_PORT);
        const databaseUsername: string = this.props.get(CONFIG_FILE_KEY_DATABASE_USERNAME);
        const databasePassword: string = this.props.get(CONFIG_FILE_KEY_DATABASE_PASSWORD);

        const smtpHost: string = this.props.get(CONFIG_FILE_KEY_SMTP_HOST);
        const smtpPort: string = this.props.get(CONFIG_FILE_KEY_SMTP_PORT);
        const smtpUsername: string = this.props.get(CONFIG_FILE_KEY_SMTP_USERNAME);
        const smtpPassword: string = this.props.get(CONFIG_FILE_KEY_SMTP_PASSWORD);
        const smtpSender: string = this.props.get(CONFIG_FILE_KEY_SMTP_SENDER);

        // ###################################################################
        // ### valiating SMTP.HOST configuratoin key
        // ###################################################################
        if (!smtpHost) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SMTP_HOST);
        }
        if (!isFqdn && !isIPV4) {
            throw new ConfigurationError(ConfigurationError.INVALID_CONFIG_KEY, CONFIG_FILE_KEY_SMTP_HOST);
        }

        // ###################################################################
        // ### valiating SMTP.PORT configuratoin key
        // ###################################################################
        if (!smtpPort) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SMTP_PORT);
        }

        // ###################################################################
        // ### valiating SMTP.USERNAME configuratoin key
        // ###################################################################
        if (!smtpUsername) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SMTP_USERNAME);
        }

        // ###################################################################
        // ### valiating SMTP.PASSWORD configuratoin key
        // ###################################################################
        if (!smtpPassword) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SMTP_PASSWORD);
        }

        // ###################################################################
        // ### valiating SMTP.SENDER configuratoin key
        // ###################################################################
        if (!smtpSender) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SMTP_SENDER);
        }

        this.config = {
            version,
            logger: {
                level: loggerLevel,
            },
            report: {
                type: reportType,
                template: reportTemplate,
                audience: reportAudience,
            },
            database: {
                host: databaseHost,
                port: databasePort,
                username: databaseUsername,
                password: databasePassword,
            },
            smtp: {
                host: smtpHost,
                port: smtpPort,
                username: smtpUsername,
                password: smtpPassword,
                sender: smtpSender,
            },
            toString: () =>
                JSON.stringify({
                    ...this.config,
                    database: { ...this.config.database, username: '******', password: '******' },
                    smtp: { ...this.config.smtp, username: '******', password: '******' },
                }),
        };
    }

    public getConfig(): IConfigurationObject {
        return this.config;
    }
}
