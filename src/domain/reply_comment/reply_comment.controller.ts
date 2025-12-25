// comment.controller.ts

import { Controller, Post, Body } from "@nestjs/common";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { ReplyCommentService } from "./reply_comment.service";


@Controller('reply-comment')
export class ReplyCommentController {
  constructor(private readonly commentService: ReplyCommentService) {}

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }
}