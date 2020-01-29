import SmtpServiceImpl from './SmtpServiceImpl';

export interface ISmtpService {
    sendEmail(subject: string, audience: string[], body: string): Promise<void>;
}

let instance: ISmtpService;

export default class SmtpService {
    public static getInstance(): ISmtpService {
        if (!instance) {
            instance = new SmtpServiceImpl();
        }
        return instance;
    }
}
