import { PostRepository } from '../../interface/PostRepository';

export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error('Post not found');
    if (post.authorId !== userId) throw new Error('Unauthorized');

    await this.postRepository.delete(id);
  }
}