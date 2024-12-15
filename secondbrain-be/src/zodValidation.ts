import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const handleZodValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqZodBody = z.object({
    username: z.string().min(3).max(20),
    password: z
      .string()
      .min(8)
      .max(20)
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must have one UPPERCASE character",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must have one lowercase character",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must have on number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must have a special character",
      }),
  });

  const parsedUserInput = reqZodBody.safeParse(req.body);

  if (!parsedUserInput.success) {
    return res.status(411).json({ message: "Please enter correct details" });
  }

  next();
};

export default handleZodValidation;
