import puppeteer from 'puppeteer-core'
import fs from 'fs-extra'
import sanitize from 'sanitize-filename'
import { join as pathJoin, resolve as pathResolve } from 'path'
import { LoggerService, ConfigurationService } from '../../services'
import { IPdfService } from './PdfService'
import PdfError from './error/PdfError'

const log = LoggerService.getLogger('PdfServiceImpl')
const cnf = ConfigurationService.getConfig()

export default class PdfServiceImpl implements IPdfService {
  private launchOptions: any

  constructor() {
    this.launchOptions = {
      headless: true,
      executablePath: cnf.pdf.chromeExePath,
      args: ['--start-maximized'],
    }
  }

  /**
   * generates a pdf file
   *
   * @param reportTitle the title that will appear on the report
   * @param html the message body
   */
  public async generatePdf(reportTitle: string, html: string): Promise<void> {
    try {
      log.debug('creating report in pdf format')

      const browser = await puppeteer.launch(this.launchOptions)
      const page = await browser.newPage()
      const pdfFilePath = pathResolve(pathJoin(process.cwd(), cnf.pdf.outputPath))
      const fileName = `${sanitize(reportTitle)}-${new Date().getTime()}`
      const completePath = `${pdfFilePath}/${fileName}.pdf`

      await page.setContent(html)
      await fs.ensureDir(pdfFilePath)

      await page.pdf({
        path: completePath,
        displayHeaderFooter: false,
        format: 'A4',
        landscape: false,
      })

      await page.close()
      await browser.close()

      log.info(`finished the pdf creation! Saved the pdf file on ${completePath}`)
    } catch (e) {
      log.error('Could not generate the pdf due "%s"', e.message)
      throw new PdfError(PdfError.GENERAL_ERROR, e.message)
    }
  }
}
