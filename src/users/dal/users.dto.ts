import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;
}
