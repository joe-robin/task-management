import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Post('sign-up')
  signUp(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() userDto: UserDto): Promise<AccessToken> {
    return this.authService.login(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test() {
    return { message: 'Authenticated' };
  }
}
