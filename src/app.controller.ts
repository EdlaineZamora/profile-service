import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello'
  }
}
