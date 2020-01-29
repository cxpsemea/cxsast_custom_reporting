import { ConfigurationService, LoggerService } from './services';
// import { ConfigurationService, HtmlRenderingService, LoggerService, SmtpService } from './services';
// import { summaryReport } from './components/report';
// import { REPORT_TYPE_SCANSUMMARY } from './common/Constants';

const cnf = ConfigurationService.getConfig();
const log = LoggerService.getLogger('main');
// const html = HtmlRenderingService.getInstance();
// const smtp = SmtpService.getInstance();

console.log(cnf.toString());

async function main() {
    try {
        // log.info('initialized using version %s', cnf.version);
        // log.debug('initialized with %s', cnf.toString());

        // let reportData: any;
        // let reportTitle: string;

        // switch (cnf.report.type) {
        //     case REPORT_TYPE_SCANSUMMARY:
        //         reportData = await summaryReport();
        //         reportTitle = `Checkmarx: ScanSummary for "${reportData.projectName}"`;
        //         log.debug('SummaryReport data is %j', reportData);
        //         break;
        //     default:
        //         throw new Error('not valid report type');
        // }

        // const reportBody = await html.renderTemplate(reportData, cnf.report.template);

        // await smtp.sendEmail(reportTitle, cnf.report.audience, reportBody);

        log.info('finished');
    } catch (e) {
        log.fatal(e.message);
        log.info('finished');
    }
}

main();
