require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
export const UserAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["authorization"];

    if (!token || typeof token !== "string") {
      res.status(401).json({ message: "Unauthorized" });
      return; // Ensure no further execution
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_USER as string);

    if (typeof decodeToken === "object" && "id" in decodeToken) {
      req.userId = decodeToken.id as string;
      next(); // Pass control to the next middleware
    } else {
      res.status(403).json({ message: "You are not signed in..." });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error..." });
    return;
  }
};
