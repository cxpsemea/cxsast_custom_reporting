import XmlParsingServiceImpl from './XmlParsingServiceImpl';

export interface IXmlParsingService {
    fetchScanIdAndQuit(xmlReportPath: string): Promise<number>;
}

let instance: IXmlParsingService;

export default class XmlParsingService {
    public static getInstance(): IXmlParsingService {
        if (!instance) {
            instance = new XmlParsingServiceImpl();
        }
        return instance;
    }
}
