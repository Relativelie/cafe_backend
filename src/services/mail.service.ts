import nodemailer, { TransportOptions } from "nodemailer";
import config from "config";

const mailOptions = {
  host: config.service.SMTP_HOST,
  port: config.service.SMTP_PORT,
  secure: true,
  auth: {
    user: config.service.SMTP_USER,
    pass: config.service.SMTP_PASSWORD,
  },
} as TransportOptions;

export interface IMailService {
  sendActivationMail: (to: string, link: string) => void;
}

export class MailService implements IMailService {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(mailOptions);
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: config.service.SMTP_USER,
      to,
      subject: `The account activation on ${config.service.API_URL}`,
      text: "",
      html: `
      <div>
      <h1>Click on the link provided in your account activation email. </h1>
      <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}
