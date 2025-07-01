import { Post } from '../../entities/Post';
import { PostRepository } from '../../interface/PostRepository';

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: string, data: { title: string; content: string }, userId: string): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error('Post not found');
    if (post.authorId !== userId) throw new Error('Unauthorized');

    return this.postRepository.update(id, { ...data, authorId: userId });
  }
}