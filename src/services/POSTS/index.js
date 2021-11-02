import express from "express";
import createHttpError from "http-errors";
import PostModel from "./schema.js";
import { CommentSchema }  from "../COMMENTS/schema.js"

import { basicAuthMiddleware } from "../../auth/indexAutorization.js"
import { adminOnlyMiddleware } from "../../auth/indexAutorization.js"

const postRouter = express.Router();

postRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);
    const { _id } = await newPost.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

postRouter.get("/", async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      next(createHttpError(404, `Post with id ${postId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

postRouter.put("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const modifiedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    if (modifiedPost) {
      res.send(modifiedPost);
    } else {
      next(createHttpError(404, `Post with id ${postId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

postRouter.delete("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (deletedPost) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Post with id ${postId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});







//////////////////////////////------------------------ post router day 8 -----------------------------

postRouter.post("/:_id/comment", async (req, res, next) => {
  try {

    const PostId=req.params._id
    const post=await PostModel.findById(req.params._id)
    if(post){                
       
        console.log("here")
        const updatedPost=await PostModel.findByIdAndUpdate(
            req.params._id,
             {$push:{comments: req.body}},
             {new:true}
        )
        res.send(updatedPost)
      }else{
        next(createHttpError(404,`POST ID${PostId} NOT FOUND`))
  }}
  
  catch (error) {
    next(error);
  }
});


postRouter.get("/:_id/comments", async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params._id)
    .select("comments")
    if (post) {
      res.send(post.commentBlog)
    } else {
      next((404, `post with id ${req.params._id} not found!`))
    }
  } catch (error) {
    next(error);
  }
});


//get one comment 
postRouter.get("/:_id/comment/:commentId", async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params._id)
    if (post) {
      const postComment = post.commentBlog.find(comment => comment._id.toString() === req.params.commentId) 
      if (postComment) {
        res.send(postComment)
      } else {
        next(createHttpError(404, `comment with id ${req.params.commentId} doesnt exist`))
      }
    } else {
        next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
      }
  } catch (error) {
    next(error);
  }
});





postRouter.delete("/:_id/comment/:commentId", async (req, res, next) => {
  try {
    const post = await postModel.findByIdAndUpdate(
        req.params.postId, 
        { $pull: { commentBlog: { _id: req.params.commentId } } }, 
        { new: true } 
      )
      if (post) {
        res.send(post)
      } else {
        next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
      }


  } catch (error) {
    next(error);
  }
});


//------------------------modul 8 



postRouter.post("/me", async (req, res, next) => {
  try {
    const newUser = new UserSchema(req.body)
    const { _id } = await newUser.save()
    res.send({ _id })
  } catch (error) {
    next(error)
  }
})


postRouter.get("/me/stories", basicAuthMiddleware, async (req, res, next) => {
  try {
    const users = await UserSchema.findById(req.params.id)
    res.send(users)
  } catch (error) {
    next(error)
  }
})







export default postRouter;
