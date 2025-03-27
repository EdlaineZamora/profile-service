import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('api/v1/formulario')
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async enviarFormulario(@Body() payload: any): Promise<any> {
    const { nome, email, assunto, mensagem } = payload;

    try {
      const resultado = await this.emailService.sendEmail(nome, email, assunto, mensagem);
      return { mensagem: resultado };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
