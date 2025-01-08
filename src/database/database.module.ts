import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                password: configService.get('POSTGRES_PASSWORD'),
                username: configService.get('POSTGRES_USER'),
                database: configService.get('POSTGRES_DB'),
                synchronize: false,
                autoLoadEntities:true,
            })
        })
    ]
})
export class DatabaseModule {}
