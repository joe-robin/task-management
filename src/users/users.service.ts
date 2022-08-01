import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseConflictCode } from 'src/utils/constants';
import { UserDto } from './dto/user.dto';
import { UserDocument, Users } from './entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: UserDto) {
    const salt = await genSalt();
    createUserDto.password = await hash(createUserDto.password, salt);
    try {
      return await new this.userModel(createUserDto).save();
    } catch (err) {
      if (err.code === MongooseConflictCode) {
        throw new ConflictException('User Name Already Exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(loginUserDto: LoginUserDto) {
    return await this.userModel.findOne(loginUserDto);
  }

  async findOneWithPassword(loginUserDto: LoginUserDto) {
    return await this.userModel.findOne(loginUserDto).select('+password');
  }

  async findOneById(id: string) {
    return this.userModel.findById(id);
  }

  async remove(id: number) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
