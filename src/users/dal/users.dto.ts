import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export enum ReminderFrequency {
  DAILY = 'DAILY',
  THREE_TIMES_A_DAY = 'THREE_TIMES_A_DAY',
  HOURLY = 'HOURLY',
  NEVER = 'NEVER',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEnum(ReminderFrequency)
  reminderFrequency?: ReminderFrequency;
}
