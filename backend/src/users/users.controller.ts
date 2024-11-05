import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailExistedException } from './../exceptions/customs/emailExistedException';
import { UsernameExistedException } from './../exceptions/customs/usernameExistedException';
import { Public } from './../app.guard';
import { TokenExpiredException } from './../exceptions/customs/expiredTokenException';
import { TokenInvalidException } from './../exceptions/customs/tokenInvalidException';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      await this.usersService.create(createUserDto);
      return { message: 'User created successfully' };
    } catch (error) {
      if (
        error instanceof EmailExistedException ||
        error instanceof UsernameExistedException
      ) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to create a new user');
      }
    }
  }

  @Get('/get-email')
  @Public()
  async findOne(@Query('email') email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }

  @Get('/get-username')
  @Public()
  async findByUsername(@Query('username') username: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Username not found');
    }
    return user;
  }

  @Get('/profile')
  async getProfile(@Req() req: Request): Promise<any> {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      return await this.usersService.getProfile(token);
    } catch (error) {
      if (
        error instanceof TokenExpiredException ||
        error instanceof TokenInvalidException
      ) {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException('Failed to get user profile');
    }
  }

  // Just for testing
  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }
}
