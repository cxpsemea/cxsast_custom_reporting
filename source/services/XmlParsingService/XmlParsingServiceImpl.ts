import { IXmlParsingService } from './XmlParsingService';
import lineReader from 'line-reader';
import { LoggerService } from '../LoggerService';

const log = LoggerService.getLogger('XmlParsingServiceImpl');

const extractMatchFromString = (_pattern: RegExp, _val: string): string | undefined => {
    const arr = _pattern.exec(_val);
    if (arr && arr[0]) {
        return arr[0];
    }
    return undefined;
};

const getScanIdAndQuit = (path: string): Promise<any> => {
    return new Promise(resolve => {
        lineReader.eachLine(path, line => {
            if (line.includes('CxXMLResults')) {
                const xmlProp = extractMatchFromString(/ScanId=\"[0-9]*\"/g, line);
                const xmlPropValue = extractMatchFromString(/\d+/g, xmlProp ? xmlProp : '');
                log.debug('fetched xmlProperty %s', xmlProp);
                log.debug('fetched xmlPropertyValue %s', xmlPropValue);
                resolve(xmlPropValue);
                return false;
            }
            return true;
        });
    });
};

export default class XmlParsingServiceImpl implements IXmlParsingService {
    public async fetchScanIdAndQuit(_xmlReportPath: string): Promise<number> {
        const scanId = await getScanIdAndQuit(_xmlReportPath);

        log.info('fetched scanId=%s from %s', scanId, _xmlReportPath);

        return Promise.resolve(scanId ? scanId : 0);
    }
}
