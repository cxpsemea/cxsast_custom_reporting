import logger from 'log4js';
import { ConfigurationService } from '../ConfigurationService';

let configured: boolean;

const cnf = ConfigurationService.getConfig();

export default class LoggerService {
    public static getLogger(name: string) {
        if (!configured) {
            logger.configure({
                appenders: {
                    console: { type: 'console', layout: { type: 'pattern', pattern: '%d %-6z %-5p %-16.16c  %m' } },
                },
                categories: { default: { appenders: ['console'], level: cnf.logger.level } },
            });
            configured = true;
        }
        return logger.getLogger(name);
    }
}
