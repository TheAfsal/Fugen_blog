import { Post } from '../entities/Post';
import { BaseRepository } from './BaseRepository';

export interface PostRepository extends BaseRepository<Post, string> {
  create(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post>;
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
  update(id: string, data: Omit<Post, 'id' | 'createdAt'>): Promise<Post>;
  delete(id: string): Promise<void>;
  findByAuthorId(authorId: string): Promise<Post[]>;
}