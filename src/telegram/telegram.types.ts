import { Update, CallbackQuery } from 'telegraf/typings/core/types/typegram';

export type DataQueryUpdate =
  Update.CallbackQueryUpdate<CallbackQuery.DataQuery>;
