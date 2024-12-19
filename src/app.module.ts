import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./.env'
    }),
    UsersModule, 
    AdminsModule, 
    DatabaseModule, 
    ProductsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
