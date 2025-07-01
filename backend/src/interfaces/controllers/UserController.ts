import { NextFunction, Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import { RegisterUserDTO } from "../../application/dtos/RegisterUserDTO";
import { JWTAuth } from "../../infrastructure/auth/JWTAuth";
import { LoginUserDTO } from "../../application/dtos/LoginUserDTO";

export class UserController {
  constructor(private userService: UserService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new RegisterUserDTO();
      dto.email = req.body.email;
      dto.password = req.body.password;
      const user = await this.userService.registerUser(dto);
      const token = JWTAuth.generateToken(user);
      res.cookie("fugen-id", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new LoginUserDTO();
      dto.email = req.body.email;
      dto.password = req.body.password;
      const user = await this.userService.loginUser(dto);
      const token = JWTAuth.generateToken(user);
      res.cookie("fugen-id", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });
      res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) throw new Error("User not found");
      res.status(200).json({ user, token: req?.cookies["fugen-id"] });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("fugen-id", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  };
}
