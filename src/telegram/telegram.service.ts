import { Injectable, Logger } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class TelegramService {
  constructor(@InjectBot() private bot: Telegraf) {
    this.bot.telegram.setMyCommands([
      { command: 'new_word', description: 'מילה חדשה' },
      { command: 'change_frequency', description: 'שינוי תדירות' },
      { command: 'start', description: 'התחלה' },
    ]);
  }

  private readonly logger = new Logger(TelegramService.name);

  async sendMarkdownMessage(
    chatId: number,
    message: string,
  ): Promise<{ success: boolean; reason?: 'blocked' | 'error' }> {
    try {
      await this.bot.telegram.sendMessage(chatId, message, {
        parse_mode: 'MarkdownV2',
      });
      return { success: true };
    } catch (error) {
      if (error.description === 'Forbidden: bot was blocked by the user') {
        this.logger.warn(`User with chatId ${chatId} blocked the bot.`);
        return { success: false, reason: 'blocked' };
      } else {
        this.logger.error(
          `Failed to send message to chat ${chatId}: ${error.message}`,
        );
        return { success: false, reason: 'error' };
      }
    }
  }
}
