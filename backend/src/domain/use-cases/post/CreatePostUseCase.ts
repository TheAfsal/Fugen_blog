import { Post } from "../../entities/Post";
import { PostRepository } from "../../interface/PostRepository";

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(data: Omit<Post, "id" | "createdAt">): Promise<Post> {
    const post: Post = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    return this.postRepository.create(post);
  }
}
