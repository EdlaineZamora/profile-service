import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {

  const nodemailer = require('nodemailer');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async sendEmail(nome: string, email: string, assunto: string, mensagem: string, destino: string): Promise<string> {
    if (!nome || !email || !assunto || !mensagem || !destino) {
      throw new Error('Todos os campos são obrigatórios!');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: destino,
      subject: `Assunto do formulário: ${assunto || 'Sem Assunto'}`,
      text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return 'E-mail enviado com sucesso!';
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new Error('Erro ao enviar e-mail.');
    }
  }
}
