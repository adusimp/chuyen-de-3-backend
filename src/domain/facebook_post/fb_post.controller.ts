import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

  @Patch(':id/facebook-url')
  @ApiOperation({ summary: 'Cập nhật link Facebook sau khi đăng thành công' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        url: { type: 'string', example: 'https://facebook.com/post/123456' } 
      } 
    } 
  })
  async updateFbUrl(
    @Param('id', ParseIntPipe) id: number, // Tự động chuyển ID string sang number
    @Body('url') url: string // Chỉ lấy đúng trường "url" trong body
  ) {
    return this.fbPostService.updateFacebookUrl(id, url);
  }
}
