import { Update, Ctx, Start, Command } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';
import { WordsService } from '@lib/words';
import { UsersService } from 'src/users/users.service';
import { Logger } from '@nestjs/common';

@Update()
export class BotStart {
  constructor(
    private wordsService: WordsService,
    private usersService: UsersService,
    private logger: Logger,
  ) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('מרחבא, אני אשלח לך מידי פעם מילים לתרגול בערבית.');
    await ctx.reply('הנה המילה הראשונה שלך:');
    const firstWordMessage = this.wordsService.getRandomWordMessage();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await ctx.replyWithMarkdownV2(firstWordMessage);

    try {
      await this.usersService.create({ chatId: ctx.chat.id });
    } catch (error) {
      this.logger.warn(error);
    }
  }

  @Command('new_word')
  async sendNewWord(@Ctx() ctx: TelegrafContext) {
    const wordMessage = this.wordsService.getRandomWordMessage();
    await ctx.replyWithMarkdownV2(wordMessage);
  }

  @Command('change_reminder')
  async changeReminder(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('באיזה תדירות תרצה לקבל מילים לתרגול?', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'פעם ביום 👍🏼',
              callback_data: 'DAILY',
            },
          ],
          [
            {
              text: 'כל שעה 🇸🇦👳🏻‍♂️',
              callback_data: 'HOURLY',
            },
          ],
          [
            {
              text: '3 פעמים ביום 🤯',
              callback_data: 'THREE_TIMES_A_DAY',
            },
          ],
        ],
      },
    });
  }

  @Command('who_am_i')
  async whoAmI(@Ctx() ctx: TelegrafContext) {
    ctx.reply('מרחבא, אני אשלח לך מילים בערבית לתרגול יום יומי.');
  }
}
