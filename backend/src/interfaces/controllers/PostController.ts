import { Request, Response } from 'express';
import { PostService } from '../../application/services/PostService';
import { CreatePostDTO } from '../../application/dtos/CreatePostDTO';

import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: JwtPayload | { id: string; email: string };
  }
}

export class PostController {
  constructor(private postService: PostService) {}

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized: No user data found' });
        return;
      }

      const dto = new CreatePostDTO();
      dto.title = req.body.title;
      dto.content = req.body.content;
      dto.authorId = req.user.id; // TypeScript should now recognize req.user
      const post = await this.postService.createPost(dto);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}