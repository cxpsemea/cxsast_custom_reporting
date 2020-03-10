import lineReader from 'line-reader';
import { LoggerService } from '../LoggerService';
import { IXmlParsingService } from './XmlParsingService';

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

const getProjectIdAndQuit = (path: string): Promise<any> => {
    return new Promise(resolve => {
        lineReader.eachLine(path, line => {
            if (line.includes('CxXMLResults')) {
                const xmlProp = extractMatchFromString(/ProjectId=\"[0-9]*\"/g, line);
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

    public async fetchProjectIdAndQuit(_xmlReportPath: string): Promise<number> {
        const projectId = await getProjectIdAndQuit(_xmlReportPath);

        log.info('fetched projectId=%s from %s', projectId, _xmlReportPath);

        return Promise.resolve(projectId ? projectId : 0);
    }
}
