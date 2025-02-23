import { Body, Controller, Get, Post, Query, NotFoundException, BadRequestException } from '@nestjs/common';

@Controller('api/v1/pessoas')
export class AppController {
  private pessoas = [];

  constructor() {}

  @Get()
  getAllOrFilteredPessoas(@Query('email') email?: string): any {
    console.log('Requisição GET recebida', { email });

    if (email) {
      const pessoa = this.pessoas.find((p) => p.email === email);
      if (!pessoa) {
        console.log('Pessoa não encontrada');
        throw new NotFoundException('Pessoa não encontrada');
      }
      console.log('Pessoa encontrada:', pessoa);
      return pessoa; 
    }
    console.log('Retornando todas as pessoas:', this.pessoas);
    return this.pessoas; 
  }

  @Post()
  createPessoa(@Body() payload: any): any {
    console.log('Requisição POST recebida', { payload });

    const { nome, email, documento, endereco } = payload;

    if (!nome || !email) {
      console.log('Nome e email são obrigatórios');
      throw new BadRequestException('Nome e email são obrigatórios');
    }

    const pessoaExistente = this.pessoas.find((p) => p.email === email);
    if (pessoaExistente) {
      console.log('Já existe uma pessoa com esse email');
      throw new BadRequestException('Já existe uma pessoa com esse email');
    }

    const novaPessoa = { nome, email, documento, endereco };
    this.pessoas.push(novaPessoa);

    console.log('Pessoa cadastrada com sucesso:', novaPessoa);
    return {
      message: 'Pessoa cadastrada com sucesso!',
      novaPessoa,
    };
  }
}
