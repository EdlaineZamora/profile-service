import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { EmailService } from './email.service'; 

@Module({
  imports: [ConfigModule.forRoot()], 
  controllers: [AppController],
  providers: [EmailService],  
})
export class AppModule {}