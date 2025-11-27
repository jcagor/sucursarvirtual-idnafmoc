import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_AWS_ENDPOINT,
    port: 465,
    secure: true,
    logger: true,
    //debug: true,
    auth: {
      user: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      pass: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
    tls: {
      ciphers: 'SSLv3',
      requireTLS: true,
      rejectUnauthorized: true,
    },
  });

  async sendEmail(
    to: string,
    subject: string,
    htmlBody: string,
    plainText?: string,
    attachments?: Array<{ filename: string; content: Buffer }>,
  ) {
    const result = await this.transporter.sendMail({
      from: 'no-reply@comfandi.com.co',
      to,
      subject,
      html: htmlBody,
      text: plainText,
      attachments,
    });
    return result;
  }

  async sendEmailComplete(
    to: string,
    subject: string,
    htmlBody: string,
    plainBody: string,
  ) {
    const result = await this.transporter.sendMail({
      from: 'no-reply@comfandi.com.co',
      to,
      subject,
      html: htmlBody,
      text: plainBody,
    });
  }
}
