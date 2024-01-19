import { WordsService } from '@lib/words';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TelegramService } from 'src/telegram/telegram.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RemindersService {
  constructor(
    private readonly logger: Logger,
    private readonly wordsService: WordsService,
    private readonly telegramService: TelegramService,
    private readonly usersService: UsersService,
  ) {}

  // every hour from 8:00 to 22:00 israel time
  //   @Cron('0 0 8-22 * * *', {
  @Cron('0 0 * * * *', { timeZone: 'Asia/Jerusalem' })
  async sendWordToAllSubscribers() {
    this.logger.log(`Sending word to subscribed users`);
    const users = await this.usersService.getAll();
    const message = this.wordsService.getRandomWordMessage();

    await Promise.allSettled(
      users.map((user) =>
        this.telegramService.sendMarkdownMessage(user.chatId, message),
      ),
    );
  }
}
