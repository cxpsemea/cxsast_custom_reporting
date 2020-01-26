import PropertiesReader from 'properties-reader';
import yargs from 'yargs';
import { IConfigurationService, IConfigurationObject } from './ConfigurationService';
import ConfigurationError from './error/ConfigurationError';
import { isUrl, isFqdn, isIPV4 } from '../../common/Validator';
import { readFile } from '../../common/Utilities';

import {
    FILE_VERSION,
    CONFIG_FILE,
    CONFIG_FILE_KEY_SAST_URL,
    CONFIG_FILE_KEY_SAST_USERNAME,
    CONFIG_FILE_KEY_SAST_PASSWORD,
    CONFIG_FILE_KEY_SMTP_HOST,
    CONFIG_FILE_KEY_SMTP_PORT,
    CONFIG_FILE_KEY_SMTP_USERNAME,
    CONFIG_FILE_KEY_SMTP_PASSWORD,
    CONFIG_FILE_KEY_SMTP_SENDER,
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

        console.log(this.args);

        const version = readFile(FILE_VERSION);
        const reportType = this.args.reportType ? this.args.reportType : 'ScanSummary';
        const reportTemplate = this.args.reportTemplate ? this.args.reportTemplate : 'ScanSummaryTemplate';
        const reportAudience = this.args.reportAudience ? this.args.reportAudience : undefined;
        const sastUrl: string = this.props.get(CONFIG_FILE_KEY_SAST_URL);
        const sastUsername: string = this.props.get(CONFIG_FILE_KEY_SAST_USERNAME);
        const sastPassword: string = this.props.get(CONFIG_FILE_KEY_SAST_PASSWORD);
        const smtpHost: string = this.props.get(CONFIG_FILE_KEY_SMTP_HOST);
        const smtpPort: string = this.props.get(CONFIG_FILE_KEY_SMTP_PORT);
        const smtpUsername: string = this.props.get(CONFIG_FILE_KEY_SMTP_USERNAME);
        const smtpPassword: string = this.props.get(CONFIG_FILE_KEY_SMTP_PASSWORD);
        const smtpSender: string = this.props.get(CONFIG_FILE_KEY_SMTP_SENDER);

        // ###################################################################
        // ### valiating SAST.URL configuratoin key
        // ###################################################################
        if (!sastUrl) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SAST_URL);
        }

        if (!isUrl(sastUrl)) {
            throw new ConfigurationError(ConfigurationError.INVALID_CONFIG_KEY, CONFIG_FILE_KEY_SAST_URL);
        }

        // ###################################################################
        // ### valiating SAST.USERNAME configuratoin key
        // ###################################################################
        if (!sastUsername) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SAST_USERNAME);
        }

        // ###################################################################
        // ### valiating SAST.PASSWORD configuratoin key
        // ###################################################################
        if (!sastPassword) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, CONFIG_FILE_KEY_SAST_PASSWORD);
        }

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
            report: {
                type: reportType,
                template: reportTemplate,
                audience: reportAudience,
            },
            sast: {
                url: sastUrl,
                username: sastUsername,
                password: sastPassword,
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
                    sast: { ...this.config.sast, username: '******', password: '******' },
                    smtp: { ...this.config.smtp, username: '******', password: '******' },
                }),
        };
    }

    public getConfig(): IConfigurationObject {
        return this.config;
    }
}
