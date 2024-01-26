import { Injectable, Logger } from '@nestjs/common';
import { UsersDalService } from './dal/users.dal';
import { CreateUserDto, UpdateUserDto } from './dal/users.dto';
import { User } from './dal/users.schema';

@Injectable()
export class UsersService {
  constructor(private usersDal: UsersDalService, private logger: Logger) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log(
        `[UsersService] creating user with chatId ${createUserDto.chatId}`,
      );
      return this.usersDal.create(createUserDto);
    } catch (error) {
      this.logger.error(
        `[UsersService] failed to create user with chatId ${createUserDto.chatId}`,
        error,
      );
    }
  }

  async getAll(): Promise<User[]> {
    try {
      this.logger.log(`[UsersService] getting all users`);
      return this.usersDal.findAll();
    } catch (error) {
      this.logger.error(`[UsersService] failed to get all users`, error);
    }
    return this.usersDal.findAll();
  }

  async updateByChatId(
    chatId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      this.logger.log(
        `[UsersService] updating user with chatId ${chatId}`,
        updateUserDto,
      );
      const user = await this.usersDal.findByChatId(chatId);

      return this.usersDal.update(user._id.toString(), updateUserDto);
    } catch (error) {
      this.logger.error(
        `[UsersService] failed to update user with chatId ${chatId}`,
        error,
      );
    }
  }
}
