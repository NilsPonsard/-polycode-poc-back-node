import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { newTokenPair } from './create-token';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await User.findOne({ where: { username } });
    if (!user) throw new HttpException('Invalid username/password', 401);

    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) throw new HttpException('Invalid username/password', 401);

    return newTokenPair(user);
  }
}
