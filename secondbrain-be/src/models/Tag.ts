import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export const Tags = mongoose.model("Tags", TagsSchema);
