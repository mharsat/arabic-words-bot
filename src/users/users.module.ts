import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dal/users.schema';
import { UsersDalService } from './dal/users.dal';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersDalService, UsersService],
  exports: [UsersService, UsersDalService],
})
export class UsersModule {}
