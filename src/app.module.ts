import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RemindersModule } from './reminders/reminders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        connectionFactory: (connection) => {
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    RemindersModule,
    UsersModule,
  ],
})
export class AppModule {}
