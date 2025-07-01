import { Request, Response, NextFunction } from "express";
import { JWTAuth } from "../../infrastructure/auth/JWTAuth";

// export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     res.status(401).json({ message: 'Unauthorized' });
//     return;
//   }

//   try {
//     const decoded = JWTAuth.verifyToken(token);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["fugen-id"];
  if (!token) {
    next(
      Object.assign(new Error("Unauthorized: No token provided"), {
        statusCode: 401,
      })
    );
    return;
  }

  try {
    const decoded = JWTAuth.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(
      Object.assign(new Error("Unauthorized: Invalid token"), {
        statusCode: 401,
      })
    );
    return;
  }
};
