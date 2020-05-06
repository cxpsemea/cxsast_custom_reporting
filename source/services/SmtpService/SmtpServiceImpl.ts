import mail from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ISmtpService } from './SmtpService';
import { LoggerService, ConfigurationService, ArgumentsService } from '../../services';
import SmtpError from './error/SmtpError';

const args = ArgumentsService.getArgs();
const cnf = ConfigurationService.getConfig();
const log = LoggerService.getLogger('SmtpServiceImpl');

export default class SmtpServiceImpl implements ISmtpService {
    private transport: Mail;
    private transportOpts: SMTPTransport.Options;

    constructor() {
        this.transportOpts = {
            host: cnf.smtp.host,
            // tslint:disable-next-line: radix
            port: parseInt(cnf.smtp.port),
            auth: {
                user: cnf.smtp.username,
                pass: cnf.smtp.password,
            },
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
        };

        this.transport = mail.createTransport(this.transportOpts);
    }

    /**
     * sends an email message
     *
     * @param _subject the message subject
     * @param _audience the message audience
     * @param _body the message body
     */
    public async sendEmail(_subject: string, _audience: string[], _body: string): Promise<void> {
        try {
            const mailOpts: Mail.Options = {
                from: cnf.smtp.sender,
                to: _audience,
                subject: _subject,
                html: _body,
            };

            log.debug(
                'sending email using TransportOptions=%j MessageOptions=%j',
                { ...this.transportOpts, auth: { user: '******', pass: '******' } },
                { ...mailOpts, html: 'OMITTED' }
            );

            await this.transport.sendMail(mailOpts);

            log.info('finished sending email to "%s"', args.report.audience.join(','));

            return Promise.resolve();
        } catch (e) {
            log.error('Could not send email due "%s"', e.message);
            throw new SmtpError(SmtpError.GENERAL_ERROR, e.message);
        }
    }
}
