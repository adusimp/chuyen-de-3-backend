import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/reply_comment.entity";
import { ReplyCommentController } from "./reply_comment.controller";
import { ReplyCommentService } from "./reply_comment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [ReplyCommentController],
    providers: [ReplyCommentService],
    exports: [],
})
export class ReplyCommentModule {}