import { Post } from '../../entities/Post';
import { PostRepository } from '../../interface/PostRepository';

export class GetPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(page: number, limit: number, search: string): Promise<{ posts: Post[]; total: number }> {
    if (page < 1 || limit < 1) {
      throw Object.assign(new Error('Invalid pagination parameters'), { statusCode: 400 });
    }
    return this.postRepository.findAll(page, limit, search);
  }
}