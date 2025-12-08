import { Body, Controller, Post } from '@nestjs/common';
import { FbPostService } from './fb_post.service';
import { ApiBody, ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('fb-post')
export class FbPostController {
  constructor(private readonly fbPostService: FbPostService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new Facebook post' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          example: 'Nội dung bài viết ở đây',
          description: 'Nội dung text của bài post',
        },
        image_url: {
          type: 'string',
          example: 'https://example.com/image.png',
          description: 'Đường dẫn ảnh',
        },
      },
    },
  })
  async createPost(@Body() body: { content: string; image_url: string }) {
    return this.fbPostService.createPost(body.content, body.image_url);
  }
}
