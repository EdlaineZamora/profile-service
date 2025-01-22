import { Body, Controller, Get, Param, Post, Query, NotFoundException, BadRequestException } from '@nestjs/common';

@Controller('api/v1/pessoas')
export class AppController {
  private pessoas = [];

  constructor() {}

  @Get()
  getAllPessoas(@Query('email') email?: string): any {
    if (email) {
      const pessoa = this.pessoas.find((p) => p.email === email);
      if (!pessoa) {
        throw new NotFoundException('Pessoa não encontrada');
      }
      return pessoa;
    }
    return this.pessoas;
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

  @Get(':email')
  getPessoaByEmail(@Param('email') email: string): any {
    const pessoa = this.pessoas.find((p) => p.email === email);

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return pessoa;
  }
}
