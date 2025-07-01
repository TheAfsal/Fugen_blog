import { Post } from '../entities/Post';
import { BaseRepository } from './BaseRepository';

export interface PostRepository extends BaseRepository<Post, string> {
  findByAuthorId(authorId: string): Promise<Post[]>;
}