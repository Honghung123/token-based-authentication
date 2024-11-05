import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CredentialsDto } from './dto/credentials.dto';
import { EmailNotFoundException } from './../exceptions/customs/emailNotFoundException';
import { PasswordNotMatchException } from './../exceptions/customs/passwordNotMatchException';
import { Public } from './../app.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() credential: CredentialsDto) {
    try {
      console.log(credential);
      return await this.authenticationService.handleLogin(credential);
    } catch (error) {
      if (
        error instanceof EmailNotFoundException ||
        error instanceof PasswordNotMatchException
      ) {
        throw new BadRequestException('Invalid login credentials');
      }
      throw new InternalServerErrorException('Failed to login');
    }
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
