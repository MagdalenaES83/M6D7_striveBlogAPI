import mongoose from "mongoose";
import { CommentSchema } from "../COMMENTS/schema.js";

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    category: { type: String },
    title: { type: String, required: true },
    cover: { type: String },

    readTime: {
      value: { type: Number },
      unit: { type: String },
    },
    author: {
      name: { type: String },
      avatar: { type: String },
    },

    comments: [CommentSchema],
  },

  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
