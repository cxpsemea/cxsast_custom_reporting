import { ConfigurationService, HtmlRenderingService, LoggerService, SmtpService } from './services';
import { summaryReport } from './components/report';
import { REPORT_TYPE_SCAN_SUMMARY } from './common/Constants';

const cnf = ConfigurationService.getConfig();
const log = LoggerService.getLogger('main');
const html = HtmlRenderingService.getInstance();
const smtp = SmtpService.getInstance();

async function main() {
    try {
        log.info('initialized using version %s', cnf.version);
        log.debug('initialized with %s', cnf.toString());

        let reportData: any;

        switch (cnf.report.type) {
            case REPORT_TYPE_SCAN_SUMMARY:
                reportData = await summaryReport();
                log.debug('SummaryReport data is %j', reportData);
                break;
            default:
                throw new Error('not valid report type');
        }

        const renderedTemplate = await html.renderTemplate(reportData, cnf.report.template);

        await smtp.sendEmail('checkmarx report', cnf.report.audience.split(','), renderedTemplate);

        log.info('finished');
    } catch (e) {
        log.fatal(e.message);
        log.info('finished');
    }
}

main();
