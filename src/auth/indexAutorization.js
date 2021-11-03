import createHttpError from "http-errors"
import atob from "atob" 
import AuthorSchema from "../services/AUTHORS/schema.js"

export const AuthorizationMiddleware = async (req, res, next) => {
  console.log(req.headers)


  const encodedCredentials = req.headers.authorization.replace("Basic ", '')
    console.log(encodedCredentials)

    const [email, password] = atob(encodedCredentials).split(":")

    console.log({ email, password })

    const user = await AuthorSchema.findByCredentials(email, password)

    req.user = user

    next()

  // // if (!req.headers.authorization) {
  // //   next(createHttpError(401, "Please provide credentials in Authorization header"))
  // // } else {
   
  // //   const decodedCredentials = atob(req.headers.authorization.split(" * ")[1])
  // //   console.log(decodedCredentials)

  // //   const [email, password] = decodedCredentials.split(":")
  // //   console.log("EMAIL ", email)
  // //   console.log("PASSWORD ", password)

    

  // //   const user = await AuthorSchema.checkCredentials(email, password)
  // //   if (user) {
     
  // //     req.user = user 
  // //     next()
  // //   } else {
     
  // //     next(createHttpError(401, "Credentials are not correct!"))
  // //   }
  // // }
}
