import mongoose from "mongoose"


const { Schema } = mongoose;



export const CommentSchema = new Schema({
  asin: { type: String, required: true },
  commentBody: { type: String, required: true },
  rate: { type: String, required: true, enum: ["1", "2", "3", "4", "5"] },
  authorName: { type: String, required: true },
  
});


