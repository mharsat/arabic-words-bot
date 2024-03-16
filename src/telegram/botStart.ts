import { Update, Ctx, Start, Command, On } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';
import { WordsService } from '@lib/words';
import { UsersService } from 'src/users/users.service';
import { Logger } from '@nestjs/common';
import { DataQueryUpdate } from './telegram.types';
import { ReminderFrequency } from 'src/users/dal/users.dto';
import { ReminderFrequencyOptions } from './consts';

@Update()
export class BotStart {
  constructor(
    private wordsService: WordsService,
    private usersService: UsersService,
    private logger: Logger,
  ) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.replyWithMarkdownV2(
      'מרחבא 🪬\nאני אשלח לך מידי יום מילה לתרגול בערבית',
    );
    await ctx.reply('הנה המילה הראשונה שלך:');
    const firstWordMessage = await this.wordsService.getRandomWordMessage();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await ctx.replyWithMarkdownV2(firstWordMessage);

    try {
      await this.usersService.create({ chatId: ctx.chat.id });
    } catch (error) {
      this.logger.warn(error);
    }
  }

  @Command('new_word')
  async sendNewWord(@Ctx() ctx: TelegrafContext) {
    const wordMessage = await this.wordsService.getRandomWordMessage();
    await ctx.replyWithMarkdownV2(wordMessage);
  }

  @Command('change_frequency')
  async changeFrequency(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('באיזה תדירות תרצה לקבל מילים לתרגול?', {
      reply_markup: {
        inline_keyboard: Object.entries(ReminderFrequencyOptions).map(
          ([key, option]) => [
            {
              text: `${option.text} ${option.emoji}`,
              callback_data: key,
            },
          ],
        ),
      },
    });
  }

  @On('callback_query')
  async onCallbackQuery(
    @Ctx()
    ctx: TelegrafContext<DataQueryUpdate>,
  ) {
    const { data } = ctx.callbackQuery;
    const frequency = data as ReminderFrequency;
    const chatId = ctx.chat.id;

    if (Object.keys(ReminderFrequencyOptions).includes(frequency)) {
      await this.usersService.updateByChatId(chatId, {
        reminderFrequency: frequency,
      });
      if (frequency === ReminderFrequency.NEVER) {
        await ctx.reply('אפסיק לשלוח לך מילים לתרגול');
      } else {
        await ctx.reply(
          `מעכשיו אשלח מילה חדשה ${ReminderFrequencyOptions[data].text}`,
        );
      }
    }
  }
}
