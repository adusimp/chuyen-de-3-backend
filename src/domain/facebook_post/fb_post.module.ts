import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/fb_post.entity";
import { FbPostService } from "./fb_post.service";
import { FbPostController } from "./fb_post.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [FbPostService],
    controllers: [FbPostController],
 })
export class FbPostModule {}