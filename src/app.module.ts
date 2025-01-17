import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { SupportsModule } from './supports/supports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./.env'
    }),
    UsersModule, 
    AdminsModule, 
    DatabaseModule, 
    OrdersModule, 
    ProductsModule, 
    CartsModule, 
    SupportsModule, 
  ],
})
export class AppModule {}
