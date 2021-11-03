import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const authorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
  })


authorSchema.pre("save", async function (next) {
  const newUser = this 
  const plainPW = newUser.password
  if (newUser.isModified("password")) {
  newUser.password = await bcrypt.hash(plainPW, 10)
  }
  next()
})

authorSchema.methods.toJSON = function () {
  const userDocument = this
  const userObject = userDocument.toObject()
  delete userObject.password 
  delete userObject.__v
  return userObject
}

authorSchema.statics.checkCredentials = async function (email, plainPW) {
  // 1. find the user by email
  const user = await this.findOne({ email }) 

  if (user) {
    
    const isMatch = await bcrypt.compare(plainPW, user.password)
    
    if (isMatch) return user
    else return null // if the pw is not ok I'm returning null
  } else return null // if the email is not ok I'm returning null as well
}

export default model("User", authorSchema)