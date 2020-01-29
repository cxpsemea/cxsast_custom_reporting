import PropertiesReader from 'properties-reader';
import yargs from 'yargs';
import { IConfigurationService, IConfigurationObject } from './ConfigurationService';
import ConfigurationError from './error/ConfigurationError';
import {
    CONFIG_FILE,
    FILE_VERSION,
    CONFIG_FILE_KEY_SMTP_HOST,
    CONFIG_FILE_KEY_SMTP_PORT,
    CONFIG_FILE_KEY_SMTP_USERNAME,
    CONFIG_FILE_KEY_SMTP_PASSWORD,
    CONFIG_FILE_KEY_SMTP_SENDER,
    CONFIG_FILE_KEY_DATABASE_HOST,
    CONFIG_FILE_KEY_DATABASE_PORT,
    CONFIG_FILE_KEY_DATABASE_USERNAME,
    CONFIG_FILE_KEY_DATABASE_PASSWORD,
    CONFIG_ARGS_REPORT_TYPE,
    CONFIG_ARGS_REPORT_TEMPLATE,
    CONFIG_ARGS_REPORT_AUDIENCE,
    CONFIG_ARGS_PROJECT_XML_REPORT,
} from '../../common/Constants';
import { isFile, isEmpty, isEmail, isFqdn, isIPV4, isInteger } from '../../common/Validator';
import { readFile } from '../../common/Utilities';

enum Origin {
    CONFIG = 'CONFIG_KEY',
    ARGUMENTS = 'ARGUMENT_KEY',
}

enum KeyType {
    HOST,
    INTEGER,
    EMAIL,
    EMAIL_LIST,
    STRING,
    TEMPLATE_NAME,
    FILE_PATH,
}

const getVersion = (_path: string): string => {
    if (!isFile(_path)) {
        throw new ConfigurationError(ConfigurationError.MISSING_VERSION);
    }
    return readFile(_path);
};

export default class ConfigurationServiceImpl implements IConfigurationService {
    private props: PropertiesReader.Reader;
    private args: any;
    private config: IConfigurationObject;

    constructor() {
        try {
            this.props = PropertiesReader(CONFIG_FILE);
            this.args = yargs.argv;
        } catch (e) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_FILE, CONFIG_FILE);
        }

        this.config = {
            version: getVersion(FILE_VERSION),
            logger: {
                level: 'debug',
            },
            report: {
                type: this.parceValue(Origin.ARGUMENTS, CONFIG_ARGS_REPORT_TYPE, KeyType.STRING),
                template: this.parceValue(Origin.ARGUMENTS, CONFIG_ARGS_REPORT_TEMPLATE, KeyType.TEMPLATE_NAME),
                audience: this.parceValue(Origin.ARGUMENTS, CONFIG_ARGS_REPORT_AUDIENCE, KeyType.EMAIL_LIST).split(','),
            },
            project: {
                xmlReport: this.parceValue(Origin.ARGUMENTS, CONFIG_ARGS_PROJECT_XML_REPORT, KeyType.FILE_PATH),
            },
            database: {
                host: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_DATABASE_HOST, KeyType.HOST),
                port: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_DATABASE_PORT, KeyType.INTEGER),
                username: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_DATABASE_USERNAME, KeyType.STRING),
                password: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_DATABASE_PASSWORD, KeyType.STRING),
            },
            smtp: {
                host: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_SMTP_HOST, KeyType.HOST),
                port: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_SMTP_PORT, KeyType.INTEGER),
                username: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_SMTP_USERNAME, KeyType.STRING),
                password: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_SMTP_PASSWORD, KeyType.STRING),
                sender: this.parceValue(Origin.CONFIG, CONFIG_FILE_KEY_SMTP_SENDER, KeyType.EMAIL),
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

    private parceValue(origin: Origin, key: string, keyType: KeyType, required: boolean = true): string {
        let val = origin === Origin.CONFIG ? String(this.props.get(key)) : String(this.args[key]);

        if (isEmpty(val) && required) {
            throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, key);
        }

        switch (keyType) {
            case KeyType.HOST:
                if (!isFqdn(val) && !isIPV4(val)) {
                    throw new ConfigurationError(
                        // @ts-ignore
                        ConfigurationError[`INVALID_${origin}`],
                        key,
                        origin === Origin.ARGUMENTS ? 'invalid host' : undefined
                    );
                }
                break;
            case KeyType.EMAIL:
                if (!isEmail(val)) {
                    // @ts-ignore
                    throw new ConfigurationError(
                        // @ts-ignore
                        ConfigurationError[`INVALID_${origin}`],
                        key,
                        origin === Origin.ARGUMENTS ? 'invalid email' : undefined
                    );
                }
                break;
            case KeyType.INTEGER:
                if (!isInteger(val)) {
                    throw new ConfigurationError(
                        // @ts-ignore
                        ConfigurationError[`INVALID_${origin}`],
                        key,
                        origin === Origin.ARGUMENTS ? 'invalid integer' : undefined
                    );
                }
                break;
            case KeyType.EMAIL_LIST:
                val.split(',').forEach(item => {
                    if (!isEmail(item)) {
                        throw new ConfigurationError(
                            // @ts-ignore
                            ConfigurationError[`INVALID_${origin}`],
                            key,
                            origin === Origin.ARGUMENTS ? 'invalid email list' : undefined
                        );
                    }
                });
                break;
            case KeyType.FILE_PATH:
                if (!isFile(val)) {
                    throw new ConfigurationError(
                        // @ts-ignore
                        ConfigurationError[`INVALID_${origin}`],
                        key,
                        origin === Origin.ARGUMENTS ? 'invalid file' : undefined
                    );
                }
                break;
        }

        return val;
    }
}
