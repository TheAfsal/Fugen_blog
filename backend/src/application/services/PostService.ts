import { Post } from "../../domain/entities/Post";
import { PostRepository } from "../../domain/interface/PostRepository";
import { CreatePostUseCase } from "../../domain/use-cases/post/CreatePostUseCase";
import { UpdatePostUseCase } from "../../domain/use-cases/post/UpdatePostUseCase";
import { DeletePostUseCase } from "../../domain/use-cases/post/DeletePostUseCase";
import { GetPostsUseCase } from "../../domain/use-cases/post/GetPostsUseCase";
import { GetPostsByAuthorUseCase } from "../../domain/use-cases/post/GetPostsByAuthorUseCase";
import { CreatePostDTO } from "../dtos/CreatePostDTO";
import { UpdatePostDTO } from "../dtos/UpdatePostDTO";
import { validate } from "class-validator";

export class PostService {
  private createPostUseCase: CreatePostUseCase;
  private updatePostUseCase: UpdatePostUseCase;
  private deletePostUseCase: DeletePostUseCase;
  private getPostsUseCase: GetPostsUseCase;
  private getPostsByAuthorUseCase: GetPostsByAuthorUseCase;

  constructor(postRepository: PostRepository) {
    this.createPostUseCase = new CreatePostUseCase(postRepository);
    this.updatePostUseCase = new UpdatePostUseCase(postRepository);
    this.deletePostUseCase = new DeletePostUseCase(postRepository);
    this.getPostsUseCase = new GetPostsUseCase(postRepository);
    this.getPostsByAuthorUseCase = new GetPostsByAuthorUseCase(postRepository);
  }

  async createPost(dto: CreatePostDTO, authorId: string): Promise<Post> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw Object.assign(new Error(errors[0].constraints?.[Object.keys(errors[0].constraints)[0]] || 'Invalid post data'), { statusCode: 400 });
    }

    return this.createPostUseCase.execute({
      title: dto.title,
      content: dto.content,
      authorId,
      createdAt: new Date(),
    });
  }

  async getPosts(page: number, limit: number, search: string): Promise<{ posts: Post[]; total: number }> {
    return this.getPostsUseCase.execute(page, limit, search);
  }

  async getPostsByAuthor(authorId: string, page: number, limit: number): Promise<{ posts: Post[]; total: number }> {
    return this.getPostsByAuthorUseCase.execute(authorId, page, limit);
  }

  async updatePost(id: string, dto: UpdatePostDTO, userId: string): Promise<Post> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw Object.assign(new Error(errors[0].constraints?.[Object.keys(errors[0].constraints)[0]] || 'Invalid post data'), { statusCode: 400 });
    }

    return this.updatePostUseCase.execute(id, dto, userId);
  }

  async deletePost(id: string, userId: string): Promise<void> {
    return this.deletePostUseCase.execute(id, userId);
  }
}