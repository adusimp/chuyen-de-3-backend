import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('comments') // Tên bảng trong Database
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'post_id' })
  postId: string; // ID bài viết

  @Column({ name: 'comment_id' })
  commentId: string; // ID của comment (từ nền tảng gốc như FB, Insta...)

  @Column({ name: 'author_name' })
  authorName: string; // Tên người bình luận

  @Column({ type: 'text' })
  content: string; // Nội dung comment

  @Column({ name: 'post_url', nullable: true })
  postUrl: string; // Link bài viết

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date; // Thời gian bản ghi được lưu vào DB của mình

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}