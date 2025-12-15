import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FbPostModule } from './domain/facebook_post/fb_post.module';
import { ProductsModule } from './domain/reply_message/products/products.module';
import { OrdersModule } from './domain/reply_message/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres', // QUAN TRỌNG: Đổi thành 'postgres'
      url: process.env.DATABASE_URL, // Dùng luôn chuỗi kết nối cho gọn
      
      // Tự động load các entity (bảng)
      autoLoadEntities: true, // Hoặc dùng autoLoadEntities: true
      
      // Tự động tạo bảng nếu chưa có (chỉ dùng cho Dev)
      synchronize: true, 

      // CẤU HÌNH SSL QUAN TRỌNG CHO SUPABASE
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    FbPostModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
