import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordNotMatchException } from 'src/exceptions/customs/passwordNotMatchException';
import { comparePassword } from 'src/utilities/bcrypt.ultility';
import { EmailNotFoundException } from 'src/exceptions/customs/emailNotFoundException';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async handleLogin(credential: CredentialsDto) {
    const user = await this.usersService.findByEmail(credential.email);
    if (!user) {
      throw new EmailNotFoundException('Email not found');
    }
    const isPasswordMatched = await comparePassword(
      credential.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new PasswordNotMatchException('Password not match');
    }
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: `Bearer ${token}`,
      username: user.username,
      email: user.email,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
