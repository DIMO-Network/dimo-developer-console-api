import nodemailer from 'nodemailer';

import config from '@/config';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

class Mailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(options: MailOptions): Promise<void> {
    const mailOptions = {
      from: config.mailFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
      ...(options.replyTo && { replyTo: options.replyTo }),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${options.to}`);
    } catch (error) {
      console.error(`Error sending email to ${options.to}:`, error);
      throw new Error('Error sending email');
    }
  }
}

const mailer = new Mailer();

export default mailer as Mailer;
