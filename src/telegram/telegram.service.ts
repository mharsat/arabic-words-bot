import { Injectable, Logger } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class TelegramService {
  constructor(@InjectBot() private bot: Telegraf) {
    this.bot.telegram.setMyCommands([
      { command: 'new_word', description: 'מילה חדשה' },
      { command: 'who_am_i', description: 'אודות' },
      { command: 'change_reminder', description: 'שינוי תדירות' },
      { command: 'start', description: 'התחלה' },
    ]);
  }

  private readonly logger = new Logger(TelegramService.name);

  async sendMarkdownMessage(chatId: number, message: string) {
    this.bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'MarkdownV2',
    });
  }
}
