import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtSecret } from 'src/utils/constants';
import { JwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const { userName } = payload;
    const user = await this.userService.findOne({ userName });
    if (!user) throw new UnauthorizedException();
    return user.id;
  }
}
