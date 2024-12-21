require('dotenv').config();
import express from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "./models/User";
import { Content } from "./models/Content";
import "./db";
import { UserAuthMiddleware } from "./middlewares/userAuthMiddleware";
import { Link } from "./models/Link";
import generateRandomHash from "./utils";
import cors from "cors";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://secondbrain-v1.vercel.app",
      // "https://your-vercel-domain.vercel.app",
      "http://localhost:5173", // for local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const reqZodBody = z.object({
  username: z.string().min(3).max(25),
  password: z
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
app.post("/api/v1/signup", async (req, res) => {
  try {
    const parsedBody = reqZodBody.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(411).json({ message: "Invalid username & password" });
    }

    const { username, password } = req.body;

    const userAlreadyExists = await User.findOne({ username });

    if (userAlreadyExists) {
      res
        .status(403)
        .json({ message: "User with given username already exists..." });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword)

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User signed up...", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error whiling signing up..." });
  }
});

// signin
app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userFound = await User.findOne({ username });

    if (userFound) {
      const isUserMatched = await bcrypt.compare(password, userFound.password);

      if (isUserMatched) {
        const token = jwt.sign(
          {
            id: userFound._id,
          },
          process.env.JWT_SECRET_USER as string
        );
        res.status(200).json({ message: "User signed in...", token });
      }
    } else {
      res.status(401).json({ message: "Invalid username or password..." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while signing in..." });
  }
});

// content
app.post("/api/v1/content", UserAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { link, type, title, tags } = req.body;

    const newContent = await Content.create({
      link,
      type,
      title,
      userId,
    });

    res.status(201).json({ message: "New content added...", newContent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while adding content" });
  }
});

// get all content
app.get("/api/v1/content", UserAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const userContent = await Content.find({ userId: userId }).populate(
      "userId",
      "username"
    );
    res.status(200).json({ message: "User content retrieved...", userContent });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching user content...",
    });
  }
});

app.delete("/api/v1/content", UserAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const contentId = req.body.contentId;

    await Content.deleteMany({
      contentId,
      userId: userId,
    });

    res.status(200).json({ message: "Content deleted..." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while deleting content..." });
  }
});

app.delete(
  "/api/v1/content/:id",
  UserAuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.userId;
      const contentId = req.params.id;

      const user = await User.findOne({
        _id: userId,
      });

      const username = user?.username;
      const content = await Content.findById(contentId);

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      if (!content?.userId || content.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this brain!" });
      }

      await Content.findByIdAndDelete(contentId);

      return res.status(200).json({
        message: `Content deleted with id ${contentId} for user ${username}`,
        content,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error while deleting content with id...",
      });
    }
  }
);

// create a sharaeble link
app.post("/api/v1/brain/share", UserAuthMiddleware, async (req, res) => {
  try {
    const share = req.body.share;
    if (share) {
      const existingLink = await Link.findOne({
        userId: req.userId,
      });

      if (existingLink) {
        res.status(200).json({
          hash: existingLink.hash,
        });
      }
      const hash = generateRandomHash(12);
      console.log(hash);
      await Link.create({
        userId: req.userId,
        hash: hash,
      });

      res.status(201).json({
        hash: hash,
      });
    } else {
      await Link.deleteOne({
        userId: req.userId,
      });

      res.status(200).json({
        message: "Removed link",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while generating sharaeble link...",
    });
  }
});

// get brain via link
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink;

    const link = await Link.findOne({
      hash: hash,
    });

    if (!link) {
      res.status(404).json({ message: "Link not found..." });
    }

    const content = await Content.find({
      userId: link?.userId,
    });

    res.status(200).json({ message: "Content retrived...", content });
  } catch (error) {
    res.status(500).json({ message: "Internal error while accesing brain..." });
  }
});

app.get("/api/v1/me", UserAuthMiddleware, async (req, res) => {
  try {
    const id = req.userId;
    // console.log(id)
    const user = await User.findOne({
      _id: id,
    });

    // console.log(user)
    res.status(200).json({ message: "User fetched...", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error..." });
  }
});

// Fetch tweets
app.get(
  "/api/v1/content/tweets",
  UserAuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(404)
          .json({ message: "Please log in to see content" });
      }

      const tweets = await Content.find({
        userId,
        type: "twitter",
      });

      return res.status(200).json({ message: "All tweets fetched...", tweets });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error..." });
    }
  }
);


// Fetch youtube
app.get(
  "/api/v1/content/youtube",
  UserAuthMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res
          .status(404)
          .json({ message: "Please log in to see content" });
      }

      const youtube = await Content.find({
        userId,
        type: "youtube",
      });

      return res
        .status(200)
        .json({ message: "All youtube fetched...", youtube });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error..." });
    }
  }
);

app.listen(3000, () => {
  console.log("Server started...");
});
