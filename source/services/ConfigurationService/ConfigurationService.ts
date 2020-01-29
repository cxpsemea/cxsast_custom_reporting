import ConfigurationServiceImpl from './ConfigurationServiceImpl';

/**
 * defines how a logger service should be
 */
export interface IConfigurationService {
    getConfig(): IConfigurationObject;
}

export interface IConfigurationObject {
    version: string;
    logger: {
        level: string;
    };
    report: {
        type: string;
        template: string;
        audience: string[];
    };
    project?: {
        xmlReport?: string;
    };
    database: {
        host: string;
        port: string;
        username: string;
        password: string;
    };
    smtp: {
        host: string;
        port: string;
        username: string;
        password: string;
        sender: string;
    };
    toString(): string;
}

let instance: IConfigurationService;

/**
 * a singleton to retrieve the logger service
 */
export default class ConfigurationService {
    /**
     * retrieves the current instance of ConfigurationService
     */
    public static getConfig(): IConfigurationObject {
        if (!instance) {
            instance = new ConfigurationServiceImpl();
        }
        return instance.getConfig();
    }
}
