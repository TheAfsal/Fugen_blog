import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../../application/services/UserService";
import { MySQLUserRepository } from "../../infrastructure/database/MySQLUserRepository";
import { pool } from "../../config/database";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userRepository = new MySQLUserRepository(pool);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/verify", authMiddleware, userController.verify);
router.post("/logout", userController.logout);

export default router;
