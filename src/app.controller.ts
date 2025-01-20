/*import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello'
  }
}*/

import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('api/v1/pessoas') // Prefixo do controlador
export class AppController {
  private pessoas = []; // Lista para armazenar as pessoas

  constructor() {}

  // Endpoint para cadastrar uma pessoa
  /*@Post()
  @HttpCode(201) // Define o código de status como 201 (Created)
  createPessoa(@Body() pessoa: any): any {
    this.pessoas.push(pessoa); // Adiciona a pessoa à lista
    return { message: 'Pessoa cadastrada com sucesso!', pessoa };
  }

  // Endpoint para retornar todas as pessoas
  @Get()
  getAllPessoas(): any {
    return this.pessoas;
  }

  // Endpoint para buscar uma pessoa pelo e-mail
  @Get(':email')
  getPessoaByEmail(@Param('email') email: string): any {
    const pessoa = this.pessoas.find((p) => p.email === email);
    if (!pessoa) {
      return { message: 'Pessoa não encontrada' };
    }
    return pessoa;
  }
}

