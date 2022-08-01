import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.dto';
import { AccessToken } from './dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto): Promise<AccessToken> {
    const { userName, password } = userDto;

    const user = await this.usersService.findOneWithPassword({ userName });

    if (user && (await compare(password, user.password))) {
      const { id } = user;
      const payload: JwtPayload = {
        id,
        userName,
      };

      const accessToken = this.jwtService.sign(payload);

      return await { accessToken };
    } else {
      throw new UnauthorizedException('Please check your credientials');
    }
  }
}
