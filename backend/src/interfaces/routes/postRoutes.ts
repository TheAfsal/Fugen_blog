import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { PostService } from "../../application/services/PostService";
import { MySQLPostRepository } from "../../infrastructure/database/MySQLPostRepository";
import { pool } from "../../config/database";
import { redis } from "../../config/redis.connection";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const postRepository = new MySQLPostRepository(pool, redis);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.post("/", authMiddleware, postController.create);
router.get("/", postController.getPosts);
router.get("/author", authMiddleware, postController.getPostsByAuthor);
router.put("/:id", authMiddleware, postController.update);
router.delete("/:id", authMiddleware, postController.delete);

export default router;
