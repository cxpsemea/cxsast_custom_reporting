import mail from 'nodemailer';
import { ISmtpService } from './SmtpService';
import { LoggerService } from '../LoggerService';
import { ConfigurationService } from '../ConfigurationService';
import Mail from 'nodemailer/lib/mailer';

const log = LoggerService.getLogger('SmtpServiceImpl');
const cnf = ConfigurationService.getConfig();

export default class SmtpServiceImpl implements ISmtpService {
    private transport: Mail;

    constructor() {
        this.transport = mail.createTransport({
            host: cnf.smtp.host,
            port: parseInt(cnf.smtp.port),
            auth: {
                user: cnf.smtp.username,
                pass: cnf.smtp.password,
            },
            // secure: false,
            // tls: {
            //     rejectUnauthorized: false,
            // },
        });
    }
    public async sendEmail(_template: string, _audience: string[]): Promise<void> {
        try {
            const mailOpts: Mail.Options = {
                from: cnf.smtp.sender,
                to: _audience,
                subject: 'checkmarx',
                html: _template,
            };
            log.debug('sending email using %j', mailOpts);
            await this.transport.sendMail(mailOpts);
            log.info('finishing sending email');
            return Promise.resolve();
        } catch (e) {
            log.error('could not send email die "%s"', e.message);
            throw new Error('Could not send email due');
        }
    }
}
