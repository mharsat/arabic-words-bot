import { Logger, Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { TelegramModule } from 'src/telegram/telegram.module';
import { WordsModule } from '@lib/words';
import { TelegramService } from 'src/telegram/telegram.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TelegramModule, WordsModule, UsersModule],
  providers: [RemindersService, Logger, TelegramService, UsersService],
})
export class RemindersModule {}
