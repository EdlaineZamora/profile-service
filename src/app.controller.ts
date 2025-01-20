import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('api/v1/pessoas') // Prefixo do controlador
export class AppController {
  private pessoas = []; // Lista para armazenar as pessoas

  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello';
  }