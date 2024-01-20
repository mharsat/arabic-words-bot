import { WordsService } from '@lib/words';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TelegramService } from 'src/telegram/telegram.service';
import { ReminderPreference } from 'src/users/dal/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RemindersService {
  constructor(
    private readonly logger: Logger,
    private readonly wordsService: WordsService,
    private readonly telegramService: TelegramService,
    private readonly usersService: UsersService,
  ) {}

  shouldRemindUser(reminderPreference: ReminderPreference): boolean {
    // const theHour = new Date().getHours();
    // get current hour in Asia/Jerusalem timezone in two didits format
    const theHour = new Date().toLocaleString('he-IL', {
      timeZone: 'Asia/Jerusalem',
      hour12: false,
      hour: 'numeric',
    });
    if (reminderPreference === ReminderPreference.HOURLY) {
      return true;
    }
    if (reminderPreference === ReminderPreference.DAILY) {
      return theHour === '8';
    }
    if (reminderPreference === ReminderPreference.THREE_TIMES_A_DAY) {
      return ['8', '14', '20'].includes(theHour);
    }
  }

  // every hour from 8:00 to 22:00 israel time
  @Cron('0 0 8-22 * * *', { timeZone: 'Asia/Jerusalem' })
  async sendWordToAllSubscribers() {
    this.logger.log(`Sending word to subscribed users`);
    const users = await this.usersService.getAll();
    const message = this.wordsService.getRandomWordMessage();

    await Promise.allSettled(
      users.map(async (user) => {
        const { chatId, reminderPreference } = user;
        const shouldRemind = this.shouldRemindUser(reminderPreference);
        if (shouldRemind) {
          await this.telegramService.sendMarkdownMessage(chatId, message);
        }
      }),
    );
  }
}
