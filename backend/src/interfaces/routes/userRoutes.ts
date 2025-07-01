import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../../application/services/UserService";
import { MySQLUserRepository } from "../../infrastructure/database/MySQLUserRepository";
import { pool } from "../../config/database";

const router = Router();
const userRepository = new MySQLUserRepository(pool);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));

export default router;