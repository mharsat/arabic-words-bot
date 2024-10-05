import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEnum(ReminderFrequency)
  reminderFrequency?: ReminderFrequency;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;
}
