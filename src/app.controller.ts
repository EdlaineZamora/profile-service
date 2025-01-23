import { Body, Controller, Get, Post, Query, NotFoundException, BadRequestException } from '@nestjs/common';

@Controller('api/v1/pessoas')
export class AppController {
  private pessoas = [];

  constructor() {}

  @Get()
  getAllOrFilteredPessoas(@Query('email') email?: string): any {
    if (email) {
      const pessoa = this.pessoas.find((p) => p.email === email);
      if (!pessoa) {
        throw new NotFoundException('Pessoa não encontrada');
      }
      return pessoa; // Retorna apenas a pessoa encontrada
    }
    return this.pessoas; // Retorna todas as pessoas se nenhum email for informado
  }

  @Post()
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
