"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthMiddleware = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserAuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token || typeof token !== "string") {
            res.status(401).json({ message: "Unauthorized" });
            return; // Ensure no further execution
        }
        const decodeToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_USER);
        if (typeof decodeToken === "object" && "id" in decodeToken) {
            req.userId = decodeToken.id;
            next(); // Pass control to the next middleware
        }
        else {
            res.status(403).json({ message: "You are not signed in..." });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error..." });
        return;
    }
};
exports.UserAuthMiddleware = UserAuthMiddleware;
