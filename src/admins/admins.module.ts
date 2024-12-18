import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/database/entities';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalAdminStrategy } from './strategy/local-admin.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService):JwtModuleOptions => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: configService.get('JWT_EXPIRE_TIME')}
      }) 
    })
  ],
  controllers: [AdminsController],
  providers: [AdminsService, LocalAdminStrategy]
})
export class AdminsModule {}
