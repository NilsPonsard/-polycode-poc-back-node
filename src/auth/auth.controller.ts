import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { newTokenPair } from './create-token';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Token } from '../entities/Token.entity';
import { Request } from 'express';
import { RefreshDto } from './dto/refresh.dto';
import { refreshExpiration } from './jwt';

/**
 * AuthController
 *
 * This controller handles all routes concerning the Authentication
 *
 */
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await User.findOne({ where: { username } });
    if (!user) throw new HttpException('Invalid username/password', 401);

    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) throw new HttpException('Invalid username/password', 401);

    return newTokenPair(user);
  }

  @HttpCode(200)
  @Post('logout')
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request) {
    if (request.accessToken)
      Token.delete({
        accessToken: request.accessToken,
      });
    return { message: 'Logout successful' };
  }

  @HttpCode(200)
  @Post('refresh')
  async refreshToken(@Body() refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;

    const queryResult = await Token.findOne({
      where: { refreshToken },
      relations: { user: true },
    });
    if (!queryResult) throw new HttpException('Invalid refresh token', 401);

    const { user, createdAt } = queryResult;

    // delete old token
    Token.delete({ refreshToken });

    if (!user) throw new HttpException('Invalid refresh token', 401);

    if (createdAt.getTime() + refreshExpiration * 1000 < Date.now())
      throw new HttpException('Invalid refresh token', 401);
    return newTokenPair(user);
  }
}
