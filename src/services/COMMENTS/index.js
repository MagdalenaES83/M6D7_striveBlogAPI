import express from "express"
import q2m from "query-to-mongo"
import commentModel from "./schema.js"


const commentRouter = express.Router()


commentRouter.get("/", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query)
    //const total = await commentModel.countDocuments(mongoQuery.criteria)
    const comment = await commentModel.find(mongoQuery.criteria, mongoQuery.options.fields)
      .limit(mongoQuery.options.limit || 3)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort) 
    res.send({ links: mongoQuery.links("/comments", total), total, pageTotal: Math.ceil(total / mongoQuery.options.limit), comment})
  } catch (error) {
    next(error)
  }
})

export default commentRouter