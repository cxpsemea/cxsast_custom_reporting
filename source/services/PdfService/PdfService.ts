import PdfServiceImpl from './PdfServiceImpl'

export interface IPdfService {
  generatePdf(reportTitle: string, outputPath: string, body: string): Promise<void>
}

let instance: IPdfService

export default class PdfService {
  public static getInstance(): IPdfService {
    if (!instance) {
      instance = new PdfServiceImpl()
    }
    return instance
  }
}
