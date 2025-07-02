import { Request, Response, NextFunction } from "express";
import { PostService } from "../../application/services/PostService";
import { CreatePostDTO } from "../../application/dtos/CreatePostDTO";
import { UpdatePostDTO } from "../../application/dtos/UpdatePostDTO";
import { JwtPayload } from "jsonwebtoken";
declare module "express" {
  interface Request {
    user?: JwtPayload | { id: string; email: string };
  }
}

export class PostController {
  constructor(private postService: PostService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        throw Object.assign(new Error('Unauthorized: User not found'), { statusCode: 401 });
      }
      const dto = new CreatePostDTO();
      dto.title = req.body.title;
      dto.content = req.body.content;
      dto.authorId = req.user.id;
      const post = await this.postService.createPost(dto, req.user.id);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };

  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const { posts, total } = await this.postService.getPosts(
        page,
        limit,
        search
      );
      res.status(200).json({ posts, total, page, limit });
    } catch (error) {
      next(error);
    }
  };

  getPostsByAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { posts, total } = await this.postService.getPostsByAuthor(
        req.user!.id,
        page,
        limit
      );
      res.status(200).json({ posts, total, page, limit });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new UpdatePostDTO();
      dto.title = req.body.title;
      dto.content = req.body.content;
      const post = await this.postService.updatePost(
        req.params.id,
        dto,
        req.user!.id
      );
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.postService.deletePost(req.params.id, req.user!.id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
