import { Post } from '../../entities/Post';
import { PostRepository } from '../../interface/PostRepository';

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(data: Omit<Post, 'id'>): Promise<Post> {
    if (!data.authorId) {
      throw Object.assign(new Error('authorId should not be empty'), { statusCode: 400 });
    }
    const post: Post = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    return this.postRepository.create(post);
  }
}