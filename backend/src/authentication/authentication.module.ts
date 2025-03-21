import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtAuthModule } from './../jwt/jwt.module';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [UsersModule, JwtAuthModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
