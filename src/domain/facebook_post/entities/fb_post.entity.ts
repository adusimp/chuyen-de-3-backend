import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

// Định nghĩa Enum để dễ quản lý trạng thái
// 0: Pending, 1: Posted
export enum PostStatus {
  PENDING = 0,
  POSTED = 1,
}

@Entity('posts') // Tên bảng trong database sẽ là 'posts'
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' }) // Dùng text để chứa nội dung dài
  content: string;

  @Column()
  image_url: string;

  @Column({
    type: 'int',
    default: PostStatus.PENDING, // Mặc định khi tạo mới sẽ là 0 (Pending)
    comment: '0: Pending, 1: Posted' 
  })
  status: PostStatus;

  @CreateDateColumn() // Tự động điền ngày giờ hiện tại khi tạo record
  created_at: Date;

  @Column({ nullable: true }) // Cho phép null vì lúc mới tạo chưa có link FB
  facebook_post_url: string;
}