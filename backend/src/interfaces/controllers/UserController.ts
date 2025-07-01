import { Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import { RegisterUserDTO } from "../../application/dtos/RegisterUserDTO";
import { JWTAuth } from "../../infrastructure/auth/JWTAuth";
import { LoginUserDTO } from "../../application/dtos/LoginUserDTO";

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const dto = new RegisterUserDTO();
      dto.email = req.body.email;
      dto.password = req.body.password;
      const user = await this.userService.registerUser(dto);
      const token = JWTAuth.generateToken(user);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const dto = new LoginUserDTO();
      dto.email = req.body.email;
      dto.password = req.body.password;
      const user = await this.userService.loginUser(dto);
      const token = JWTAuth.generateToken(user);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  
}
