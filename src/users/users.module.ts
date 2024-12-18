import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { LocalUserStrategy } from './strategy/local-user.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService):JwtModuleOptions => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: configService.get('JWT_EXPIRE_TIME')}
    })
  })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, LocalUserStrategy],
})
export class UsersModule {}
