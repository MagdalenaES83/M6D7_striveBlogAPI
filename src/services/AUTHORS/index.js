import express from "express"
import q2m from "query-to-mongo" 
import AuthorSchema from './schema.js'
//import AuthorizationMiddleware from "../../auth/indexAutorization"
import JwtMiddleware from "../../auth/jwt.js"


const authorR = express.Router()


authorR.get("/", async(req, res, next) =>{
  try {
    const newQuery = q2m(req.query)
    const total = await AuthorSchema.countDocuments(newQuery.criteria)
    const authors = await AuthorSchema.find(newQuery.criteria, newQuery.options.fields)
      .limit(newQuery.options.limit || 20)
      .skip(newQuery.options.skip)
      .sort(newQuery.options.sort) 
    res.send({ links: newQuery.links("/authors", total), total, pageTotal: Math.ceil(total / newQuery.options.limit), authors })
  } catch (error) {
    next(error)
  }
})


authorR.get("/my/stories" , JwtMiddleware, 
async(req, res, next) => {
try{
const author = req.author
//"Post", postSchema
const posts = await Post.find({author: req.user._id.toString()})
res.satatus(200).send(posts)
}
catch(error){
  next(error)
}


})


authorR.get("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId
    const author = await AuthorSchema.findById(authorId) 

    if (author) {
      res.send(author)
    } else {
      next(createHttpError(404, `No Author with id ${authorId} found!`))
    }
  } catch (error) {
    next(error)
  }
})



authorR.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorSchema(req.body) 
    const { _id } = await newAuthor.save() 
delete author._doc.password
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})



authorR.put("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId
    const modifiedAuthor = await AuthorSchema.findByIdAndUpdate(authorId, req.body, {
      new: true, 
    })

    if (modifiedAuthor) {
      res.send(modifiedAuthor)
    } else {
      next(createHttpError(404, `No Author with id ${authorId} found!`))
    }
  } catch (error) {
    next(error)
  }
})


authorR.delete("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId
    const deletedAuthor = await AuthorSchema.findByIdAndDelete(authorId)

    if (deletedAuthor) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `No Author with id ${authorId} found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default authorR