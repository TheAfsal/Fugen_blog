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
      res.cookie('fugen-id', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 3600000 });
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
      res.cookie('fugen-id', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 3600000 });
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user) throw new Error('User not found');
      res.status(200).json({ user,token:req?.cookies["fugen-id"] });
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie('fugen-id', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  
}
