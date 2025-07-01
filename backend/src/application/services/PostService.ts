import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../../domain/interface/PostRepository';
import { CreatePostUseCase } from '../../domain/use-cases/post/CreatePostUseCase';
import { UpdatePostUseCase } from '../../domain/use-cases/post/UpdatePostUseCase';
import { DeletePostUseCase } from '../../domain/use-cases/post/DeletePostUseCase';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { validate } from 'class-validator';

export class PostService {
  private createPostUseCase: CreatePostUseCase;
  private updatePostUseCase: UpdatePostUseCase;
  private deletePostUseCase: DeletePostUseCase;
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.createPostUseCase = new CreatePostUseCase(postRepository);
    this.updatePostUseCase = new UpdatePostUseCase(postRepository);
    this.deletePostUseCase = new DeletePostUseCase(postRepository);
    this.postRepository = postRepository;
  }

  async createPost(dto: CreatePostDTO): Promise<Post> {
    const errors = await validate(dto);
    if (errors.length > 0) throw new Error('Invalid post data');

    return this.createPostUseCase.execute(dto);
  }

  async getPosts(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    return this.postRepository.findByAuthorId(authorId);
  }

  async updatePost(id: string, data: { title: string; content: string }, userId: string): Promise<Post> {
    return this.updatePostUseCase.execute(id, data, userId);
  }

  async deletePost(id: string, userId: string): Promise<void> {
    return this.deletePostUseCase.execute(id, userId);
  }
}