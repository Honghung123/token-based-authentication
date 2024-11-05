import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { encryptPassword } from './../utilities/bcrypt.ultility';
import { EmailExistedException } from './../exceptions/customs/emailExistedException';
import { UsernameExistedException } from './../exceptions/customs/UsernameExistedException';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { TokenExpiredException } from './../exceptions/customs/expiredTokenException';
import { TokenInvalidException } from './../exceptions/customs/tokenInvalidException';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'users') private userModel: Model<User>,
    private readonly jwtService: JwtService,
    @InjectConnection('users') private readonly connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailExists = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (isEmailExists) {
      throw new EmailExistedException('Email already exists!');
    }
    const isUsernameExists = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (isUsernameExists) {
      throw new UsernameExistedException('Username already exists!');
    }
    const hashPassword = await encryptPassword(createUserDto.password);
    const createUser = new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });
    await createUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async getProfile(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const savedUser: User = await this.findByEmail(payload?.email);
      return {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TokenExpiredException('Token has expired');
      } else if (error instanceof JsonWebTokenError) {
        throw new TokenInvalidException('Invalid token');
      }
      // Catch any other unexpected errors
      throw new Error('An error has occurred. Please try again');
    }
  }

  async update(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ username }, updateUserDto, { new: true })
      .exec();
  }

  async remove(email: string): Promise<any> {
    return this.userModel.deleteOne({ email }).exec();
  }
}
