import mongoose from "mongoose"

const { Schema, model } = mongoose

const commentSchema = new Schema({
  asin: { type: String, required: true },
  comment: { type: String, required: true },
  rate: { type: String, required: true, enum: ["1", "2", "3", "4", "5"] },
  authorName: { type: String, required: true },
})

export default model("Comment", commentSchema)