import HtmlRenderingServiceImpl from './HtmlRenderingServiceImpl';

export interface IHtmlRenderingService {
    renderTemplate(data: any, template: string): Promise<string>;
}

let instance: IHtmlRenderingService;

export default class HtmlRenderingService {
    public static getInstance(): IHtmlRenderingService {
        if (!instance) {
            instance = new HtmlRenderingServiceImpl();
        }
        return instance;
    }
}
