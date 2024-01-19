import { Injectable } from '@nestjs/common';
import { UsersDalService } from './dal/users.dal';
import { CreateUserDto } from './dal/users.dto';
import { User } from './dal/users.schema';

@Injectable()
export class UsersService {
  constructor(private usersDal: UsersDalService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersDal.create(createUserDto);
  }

  async getAll(): Promise<User[]> {
    return this.usersDal.getAll();
  }
}
