import { ConfigurationService, LoggerService } from './services';

const cnf = ConfigurationService.getConfig();
const log = LoggerService.getLogger('main');

async function main() {
    try {
        log.info('initialized with %s', cnf.toString());
    } catch (e) {
        log.fatal(e.message);
        log.info('finished');
    }
}

main();
