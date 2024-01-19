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

  @Command('who_am_i')
  async whoAmI(@Ctx() ctx: TelegrafContext) {
    ctx.reply('מרחבא, אני אשלח לך מילים בערבית לתרגול יום יומי.');
  }
}
