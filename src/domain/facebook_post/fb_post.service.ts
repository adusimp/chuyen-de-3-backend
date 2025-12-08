import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/fb_post.entity";

@Injectable()
export class FbPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async createPost(content: string, imageUrl: string) {
   try {
     const newPost = this.postRepository.create({
      content,
      image_url: imageUrl,
    });
    return await this.postRepository.save(newPost);
   } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Could not create post');
   }
  }
}