import {
  ArgumentsService,
  ConfigurationService,
  HtmlRenderingService,
  LoggerService,
  SmtpService,
  PdfService,
} from './services'
import { REPORT_TYPE_SCANSUMMARY, REPORT_TYPE_CONSOLIDATED } from './common/Constants'
import { summaryReport, consolidatedReport } from './components'
import { inspect } from 'util'

const log = LoggerService.getLogger('main')
const args = ArgumentsService.getArgs()
const config = ConfigurationService.getConfig()
const html = HtmlRenderingService.getInstance()
const smtp = SmtpService.getInstance()
const pdf = PdfService.getInstance()

const isPdfGeneratorConfigured = (): boolean => config.pdf.outputPath !== 'null' && config.pdf.chromeExePath !== 'null'

const main = async () => {
  try {
    let reportData: any
    let reportTitle: string = ''

    const { type, audience, template } = args.report

    switch (type) {
      case REPORT_TYPE_SCANSUMMARY:
        reportData = await summaryReport()
        if (reportData) {
          reportTitle = `Checkmarx: ScanSummary report for "${reportData.projectName}"`
        }
        log.debug('ScanSummary report data is %j', reportData)
        break

      case REPORT_TYPE_CONSOLIDATED:
        reportData = await consolidatedReport()
        if (reportData) {
          reportTitle = `Checkmarx: Consolidated report for "${reportData.appName}"`
        }
        log.debug('Consolidated report data is %s', inspect(reportData, false, null, true))
        break

      default:
        throw new Error('not valid report type')
    }

    if (reportData) {
      const reportHtml = await html.renderTemplate(reportData, template)

      if (audience) {
        await smtp.sendEmail(reportTitle, audience, reportHtml)
      }

      if (isPdfGeneratorConfigured()) {
        await pdf.generatePdf(reportTitle, reportHtml)
      }
    }
  } catch (e) {
    log.fatal(e.message)
  }

  log.info('finished')
}

main()
