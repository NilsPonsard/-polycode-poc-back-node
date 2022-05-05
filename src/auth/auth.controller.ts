import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { newTokenPair } from './create-token';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AccessToken } from 'src/entities/accessToken.entity';
import { Request } from 'express';
import { RefreshDto } from './dto/refresh.dto';
import { refreshExpiration } from './jwt';
import { RefreshToken } from 'src/entities/refreshToken.entity';

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
    console.log(request.accessToken);
    if (request.accessToken) AccessToken.delete({ token: request.accessToken });
    return { message: 'Logout successful' };
  }

  @HttpCode(200)
  @Post('refresh')
  async refreshToken(@Body() refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;

    const queryResult = await AccessToken.findOne({
      where: { token: refreshToken },
      relations: { user: true },
    });
    if (!queryResult) throw new HttpException('Invalid refresh token', 401);

    const { user, createdAt } = queryResult;

    // delete old token
    RefreshToken.delete({ token: refreshToken });

    if (!user) throw new HttpException('Invalid refresh token', 401);

    if (createdAt.getTime() + refreshExpiration * 1000 < Date.now())
      throw new HttpException('Invalid refresh token', 401);
    return newTokenPair(user);
  }
}
