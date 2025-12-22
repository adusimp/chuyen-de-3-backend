// create-comment.dto.ts
import { IsString, IsNotEmpty, IsUrl, IsDateString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  commentId: string;

  @IsString()
  @IsNotEmpty()
  authorName: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  postUrl: string;

}