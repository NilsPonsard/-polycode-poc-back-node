import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { sendValidationMail } from 'src/mail/send';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const hash = await bcrypt.hash(createUserDto.password, 10);

    user.hashedPassword = hash;
    const savedUser = await user.save();

    await sendValidationMail(savedUser);
    return {
      message: 'User created successfully',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
