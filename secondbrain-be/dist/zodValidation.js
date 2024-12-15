"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodValidation = (req, res, next) => {
    const reqZodBody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(20),
        password: zod_1.z
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
exports.default = handleZodValidation;
