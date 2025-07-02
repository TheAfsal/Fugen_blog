import { Post } from '../../entities/Post';
import { PostRepository } from '../../interface/PostRepository';

export class GetPostsByAuthorUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(authorId: string, page: number, limit: number): Promise<{ posts: Post[]; total: number }> {
    if (page < 1 || limit < 1) {
      throw Object.assign(new Error('Invalid pagination parameters'), { statusCode: 400 });
    }
    return this.postRepository.findByAuthorId(authorId, page, limit);
  }
}