import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '../src/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailModule,
  ],
})
export class AppModule { }