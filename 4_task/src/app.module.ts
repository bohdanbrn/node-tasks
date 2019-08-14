import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config/keys';

@Module({
  imports: [UsersModule, ProductsModule, MongooseModule.forRoot(config.mongoURI)],
})
export class AppModule {}
