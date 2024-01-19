import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersDalService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userDocument = await this.userModel.create(createUserDto);
      const user = await this.userModel.findById(userDocument.id).lean();

      return user;
    } catch (error) {
      // Duplicate key error (MongoDB error code for duplicate key)
      if (error.code === 11000) {
        throw new ConflictException(
          `User with chatId ${createUserDto.chatId} already exists.`,
        );
      }
      throw error;
    }
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }
}
