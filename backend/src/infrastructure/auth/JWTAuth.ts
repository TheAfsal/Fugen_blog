import jwt from "jsonwebtoken";
import { User } from "../../domain/entities/User";

export class JWTAuth {
  static generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
  }

  static verifyToken(token: string): { id: string; email: string } {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };
  }
}
