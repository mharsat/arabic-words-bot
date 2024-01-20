import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export enum ReminderPreference {
  DAILY = 'DAILY',
  THREE_TIMES_A_DAY = 'THREE_TIMES_A_DAY',
  HOURLY = 'HOURLY',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsOptional()
  @IsEnum(ReminderPreference)
  reminderPreference?: ReminderPreference;
}
