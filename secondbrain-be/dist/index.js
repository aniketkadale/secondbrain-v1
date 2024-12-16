"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("./models/User");
const Content_1 = require("./models/Content");
require("./db");
const config_1 = require("./config");
const userAuthMiddleware_1 = require("./middlewares/userAuthMiddleware");
const Link_1 = require("./models/Link");
const utils_1 = __importDefault(require("./utils"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const reqZodBody = zod_1.z.object({
    username: zod_1.z.string().min(3).max(25),
    password: zod_1.z
        .string()
        .min(8)
        .max(25)
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
// signup
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = reqZodBody.safeParse(req.body);
        if (!parsedBody.success) {
            res.status(411).json({ message: "Invalid username & password" });
        }
        const { username, password } = req.body;
        const userAlreadyExists = yield User_1.User.findOne({ username });
        if (userAlreadyExists) {
            res
                .status(403)
                .json({ message: "User with given username already exists..." });
        }
        const salt = yield bcrypt_1.default.genSalt(12);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // console.log(hashedPassword)
        const newUser = yield User_1.User.create({
            username: username,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User signed up...", newUser });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error whiling signing up..." });
    }
}));
// signin
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userFound = yield User_1.User.findOne({ username });
        if (userFound) {
            const isUserMatched = yield bcrypt_1.default.compare(password, userFound.password);
            if (isUserMatched) {
                const token = jsonwebtoken_1.default.sign({
                    id: userFound._id,
                }, config_1.JWT_SECRET_USER);
                res.status(200).json({ message: "User signed in...", token });
            }
        }
        else {
            res.status(401).json({ message: "Invalid username or password..." });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error while signing in..." });
    }
}));
// content
app.post("/api/v1/content", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { link, type, title, tags } = req.body;
        const newContent = yield Content_1.Content.create({
            link,
            type,
            title,
            userId,
        });
        res.status(201).json({ message: "New content added...", newContent });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error while adding content" });
    }
}));
// get all content
app.get("/api/v1/content", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const userContent = yield Content_1.Content.find({ userId: userId }).populate("userId", "username");
        res.status(200).json({ message: "User content retrieved...", userContent });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error while fetching user content...",
        });
    }
}));
app.delete("/api/v1/content", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const contentId = req.body.contentId;
        yield Content_1.Content.deleteMany({
            contentId,
            userId: userId,
        });
        res.status(200).json({ message: "Content deleted..." });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error while deleting content..." });
    }
}));
app.delete("/api/v1/content/:id", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const contentId = req.params.id;
        const user = yield User_1.User.findOne({
            _id: userId,
        });
        const username = user === null || user === void 0 ? void 0 : user.username;
        const content = yield Content_1.Content.findById(contentId);
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        if (!(content === null || content === void 0 ? void 0 : content.userId) || content.userId.toString() !== userId) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this brain!" });
        }
        yield Content_1.Content.findByIdAndDelete(contentId);
        return res.status(200).json({
            message: `Content deleted with id ${contentId} for user ${username}`,
            content,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error while deleting content with id...",
        });
    }
}));
// create a sharaeble link
app.post("/api/v1/brain/share", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const share = req.body.share;
        if (share) {
            const existingLink = yield Link_1.Link.findOne({
                userId: req.userId,
            });
            if (existingLink) {
                res.status(200).json({
                    hash: existingLink.hash,
                });
            }
            const hash = (0, utils_1.default)(12);
            console.log(hash);
            yield Link_1.Link.create({
                userId: req.userId,
                hash: hash,
            });
            res.status(201).json({
                hash: hash,
            });
        }
        else {
            yield Link_1.Link.deleteOne({
                userId: req.userId,
            });
            res.status(200).json({
                message: "Removed link",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error while generating sharaeble link...",
        });
    }
}));
// get brain via link
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareLink;
        const link = yield Link_1.Link.findOne({
            hash: hash,
        });
        if (!link) {
            res.status(404).json({ message: "Link not found..." });
        }
        const content = yield Content_1.Content.find({
            userId: link === null || link === void 0 ? void 0 : link.userId,
        });
        res.status(200).json({ message: "Content retrived...", content });
    }
    catch (error) {
        res.status(500).json({ message: "Internal error while accesing brain..." });
    }
}));
app.get("/api/v1/me", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        // console.log(id)
        const user = yield User_1.User.findOne({
            _id: id,
        });
        // console.log(user)
        res.status(200).json({ message: "User fetched...", user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error..." });
    }
}));
// Fetch tweets
app.get("/api/v1/content/tweets", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res
                .status(404)
                .json({ message: "Please log in to see content" });
        }
        const tweets = yield Content_1.Content.find({
            userId,
            type: "twitter",
        });
        return res.status(200).json({ message: "All tweets fetched...", tweets });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error..." });
    }
}));
// Fetch youtube
app.get("/api/v1/content/youtube", userAuthMiddleware_1.UserAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res
                .status(404)
                .json({ message: "Please log in to see content" });
        }
        const youtube = yield Content_1.Content.find({
            userId,
            type: "youtube",
        });
        return res
            .status(200)
            .json({ message: "All youtube fetched...", youtube });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error..." });
    }
}));
app.listen(3000, () => {
    console.log("Server started...");
});
