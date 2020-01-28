import hb from 'handlebars';
import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { IHtmlRenderingService } from './HtmlRenderingService';
import { LoggerService } from '../LoggerService';
import { TEMPLATES_FOLDER } from '../../common/Constants';

const log = LoggerService.getLogger('HtmlRenderingServiceImpl');

export default class HtmlRenderingServiceImpl implements IHtmlRenderingService {
    public async renderTemplate(_data: any, _templateFile: string): Promise<string> {
        log.debug('rendering html based on %j', { _templatePath: _templateFile, _data });

        const templateSource = readFileSync(pathJoin(TEMPLATES_FOLDER, `${_templateFile}.html`), { encoding: 'utf8' });
        const templateCompiled = hb.compile(templateSource);
        const rendered = templateCompiled(_data);

        log.info('finishing rendering html template');
        return Promise.resolve(rendered);
    }
}
