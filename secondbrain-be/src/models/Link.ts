import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  hash: {
    type: String,
    required: true,
  },

  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const Link = mongoose.model("Link", LinkSchema);
