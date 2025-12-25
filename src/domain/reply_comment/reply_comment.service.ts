import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { Comment } from "./entities/reply_comment.entity";

@Injectable()
export class ReplyCommentService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    
    // Tạo instance mới từ DTO
    const newComment = this.commentRepository.create(createCommentDto);
    
    // Lưu vào database
    return await this.commentRepository.save(newComment);
  }
}