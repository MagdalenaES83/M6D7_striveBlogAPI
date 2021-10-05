import mongoose from "mongoose"

const { Schema, model } = mongoose

const postSchema = new Schema(
  {
    category: { type: String },
    title: { type: String, required: true },
    //cover : { type: String},
    readTime: { type: String  },
    authorName: { type:String },
    authorAvatar: { type:String},
    content :{ type: String},
    createdAt: { type: Date, required: true},
    updatedAt : { type: Date, required: true},
        },

  {
    timestamps: true, 
  }
)

export default model("Post", postSchema) 
