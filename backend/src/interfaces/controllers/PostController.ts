import { Request, Response } from "express";
import { PostService } from "../../application/services/PostService";
import { CreatePostDTO } from "../../application/dtos/CreatePostDTO";
import { JwtPayload } from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: JwtPayload | { id: string; email: string };
  }
}

export class PostController {
  constructor(private postService: PostService) {}

  createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user data found" });
        return;
      }

      const dto = new CreatePostDTO();
      dto.title = req.body.title;
      dto.content = req.body.content;
      dto.authorId = req.user.id;
      const post = await this.postService.createPost(dto);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await this.postService.getPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  getPostsByAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user data found" });
        return;
      }
      const posts = await this.postService.getPostsByAuthor(req.user.id);
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user data found" });
        return;
      }
      const { id } = req.params;
      const { title, content } = req.body;
      const post = await this.postService.updatePost(
        id,
        { title, content },
        req.user.id
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user data found" });
        return;
      }
      const { id } = req.params;
      await this.postService.deletePost(id, req.user.id);
      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}
