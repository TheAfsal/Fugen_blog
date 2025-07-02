import { Post } from '../entities/Post';
import { BaseRepository } from './BaseRepository';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findAll(page: number, limit: number, search?: string): Promise<{ posts: Post[]; total: number }>;
  findByAuthorId(authorId: string, page: number, limit: number): Promise<{ posts: Post[]; total: number }>;
  findById(id: string): Promise<Post | null>;
  update(id: string, post: Partial<Post>): Promise<Post>;
  delete(id: string): Promise<void>;
}