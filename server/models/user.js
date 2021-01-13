
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String
    }
  }],
  oauth_tokens: {
    access_token: {
      type: String
    },
    refresh_token: {
      type: String
    }
  }
})

// Overriding the default method to return user
userSchema.methods.toJSON = function () {
  const user = this.toObject()

  delete user.tokens
  delete user.oauth_tokens

  return user
}

// generate authentication token for user using jwt
userSchema.methods.generateAuthToken = async function () {
  const user = this

  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY)
  user.tokens = user.tokens.concat({ token: token })
  await user.save()

  return token
}

const User = mongoose.model('User', userSchema)

module.exports = User
