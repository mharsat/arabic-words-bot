import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { BotStart } from './botStart';
import { TelegramService } from './telegram.service';
import { WordsModule } from '@lib/words';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    ConfigModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('ARABIC_WORDS_TELEGRAM_BOT_TOKEN'),
        middlewares: [session()],
      }),
      inject: [ConfigService],
    }),
    WordsModule,
    UsersModule,
  ],
  providers: [TelegramService, BotStart, UsersService, Logger],
})
export class TelegramModule {}
