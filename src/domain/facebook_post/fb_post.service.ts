import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post, PostStatus } from "./entities/fb_post.entity";

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
    throw new Error('Could not create post');
   }
  }
  async updateFacebookUrl(id: number, fbUrl: string): Promise<Post> {
    // 1. Tìm bài viết
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Không tìm thấy bài viết ID: ${id}`);
    }

    // 2. Chỉ cập nhật đúng 2 trường này
    post.facebook_post_url = fbUrl;
    post.status = PostStatus.POSTED; // Tương đương số 1

    // 3. Lưu và trả về kết quả
    return this.postRepository.save(post);
  }
}