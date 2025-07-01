import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../../domain/interface/PostRepository';
import { CreatePostUseCase } from '../../domain/use-cases/post/CreatePostUseCase';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { validate } from 'class-validator';

export class PostService {
  private createPostUseCase: CreatePostUseCase;

  constructor(postRepository: PostRepository) {
    this.createPostUseCase = new CreatePostUseCase(postRepository);
  }

  async createPost(dto: CreatePostDTO): Promise<Post> {
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error('Invalid post data');

    return this.createPostUseCase.execute({
      title: dto.title,
      content: dto.content,
      authorId: dto.authorId,
    });
  }
}