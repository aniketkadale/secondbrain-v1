import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  link: {
    type: String,
    required: true,
    unique: true,
  },

  type: {
    type: String,
    enum: ["image", "audio", "youtube", "article", "twitter"],
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
  ],

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Content = mongoose.model("Content", ContentSchema);
