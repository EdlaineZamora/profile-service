import { Body, Controller, Get, Post, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('api/v1')
export class AppController {
  private pessoas = [];

  constructor(private readonly emailService: EmailService) {}

  @Post('formulario')
  async enviarFormulario(@Body() payload: any): Promise<any> {
    const { nome, email, assunto, mensagem } = payload;

    try {
      const resultado = await this.emailService.sendEmail(nome, email, assunto, mensagem);
      return { mensagem: resultado };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('pessoas')
  getAllOrFilteredPessoas(@Query('email') email?: string): any {
    if (email) {
      const pessoa = this.pessoas.find((p) => p.email === email);
      if (!pessoa) {
        throw new NotFoundException('Pessoa não encontrada');
      }
      return pessoa;
    }
    return this.pessoas;
  }

  @Post('pessoas')
  createPessoa(@Body() payload: any): any {
    const { nome, email, documento, endereco } = payload;

    if (!nome || !email) {
      throw new BadRequestException('Nome e email são obrigatórios');
    }

    const pessoaExistente = this.pessoas.find((p) => p.email === email);
    if (pessoaExistente) {
      throw new BadRequestException('Já existe uma pessoa com esse email');
    }

    const novaPessoa = { nome, email, documento, endereco };
    this.pessoas.push(novaPessoa);

    return {
      message: 'Pessoa cadastrada com sucesso!',
      novaPessoa,
    };
  }
}
