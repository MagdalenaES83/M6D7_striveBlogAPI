import express from "express"
import createHttpError from "http-errors"
import PostModel from "./schema.js"


const postRouter = express.Router()



postRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body)
    const { _id } = await newPost.save() 
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

postRouter.get("/", async (req, res, next) => {
  try {
    const posts = await PostModel.find()
    res.send(posts)
  } catch (error) {
    next(error)
  }
})

postRouter.get("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId
    const post = await PostModel.findById(postId) 
    if (post) {
      res.send(post)
    } else {
      next(createHttpError(404, `Post with id ${postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

postRouter.put("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId
    const modifiedPost= await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true, 
    })

    if (modifiedPost) {
      res.send(modifiedPost)
    } else {
      next(createHttpError(404, `Post with id ${postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

postRouter.delete("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId

    const deletedPost = await PostModel.findByIdAndDelete(postId)

    if (deletedPost) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `Post with id ${postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default postRouter
