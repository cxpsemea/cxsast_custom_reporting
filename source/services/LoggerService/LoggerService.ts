import logger from 'log4js';

let configured: boolean;

export default class LoggerService {
    public static getLogger(name: string) {
        if (!configured) {
            logger.configure({
                appenders: {
                    console: { type: 'console', layout: { type: 'pattern', pattern: '%d %-6z %-5p %-16.16c  %m' } },
                },
                categories: { default: { appenders: ['console'], level: 'debug' } },
            });
            configured = true;
        }
        return logger.getLogger(name);
    }
}
