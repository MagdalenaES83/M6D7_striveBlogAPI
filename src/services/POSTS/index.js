import express from "express";
import createHttpError from "http-errors";
import PostModel from "./schema.js";

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

postRouter.post("/:postId/commentBlog", async (req, res, next) => {
  try {
    const comment = await PostModel.findById(req.body.comId);
    if (comment) {
      const commentToInsert = { ...comment.toObject(), commentDate: newDate() };
      const updatePost = await PostModel.findByIdAndUpdate(req.params.postId, 
        {$push: {comments: commentToInsert}},
        { new: true })
if(updatePost) { res.send(updatePost); }
    } else {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});



postRouter.get("/:postId/commentBlog", async (req, res, next) => {
  try {
    const comment = await commentModel.findById(req.params.postId)
    if (comment) {
      res.send(comment.commentBlog)
    } else {
      next(createHttpError(404, `comment with id ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(error);
  }
});



//get one comment 
postRouter.get("/postId/commentBlog/:commentId", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.postId)
    if (post) {
      const postComment = post.purchaseHistory.find(comment => comment._id.toString() === req.params.commentId) 
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





postRouter.delete("/:postId/comments/:commentId", async (req, res, next) => {
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

export default postRouter;
