import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
