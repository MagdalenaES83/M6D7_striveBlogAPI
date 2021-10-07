import mongoose from "mongoose";

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

    commentBlog: [
      {
        asin:  String ,
        rate:  String ,
        commentBody:  String,
        authorName: String ,
        createAt:  Date ,
      },
    ],

    content: { type: String },
  },

  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
