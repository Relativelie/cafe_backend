import nodemailer, { TransportOptions } from "nodemailer";
import pool from "../db";

const mailOptions = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
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
      from: process.env.SMTP_USER,
      to,
      subject: `The account activation on ${process.env.API_URL}`,
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
