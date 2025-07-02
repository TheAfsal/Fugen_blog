import { Post } from '../../entities/Post';
import { PostRepository } from '../../interface/PostRepository';

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: string, data: { title: string; content: string }, userId: string): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw Object.assign(new Error('Post not found'), { statusCode: 404 });
    }
    if (post.authorId !== userId) {
      throw Object.assign(new Error('Unauthorized: You are not the author of this post'), { statusCode: 403 });
    }
    return this.postRepository.update(id, { ...data });
  }
}