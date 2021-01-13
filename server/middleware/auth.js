// require jsonwebtoken npm for jwt based authentication
const jwt = require('jsonwebtoken')

// import the user model
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    // enabling both cookie and Bearer token auth for testing
    const token = req.cookies.jwt

    // verify if the jwt auth token is valid and decode it
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // find the user from the decoded jwt
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    })

    // check if the user exists, if not throw an error
    if (!user) {
      throw new Error('User not found')
    }

    // the middleware provides the current user as req.user
    req.user = user
    req.token = token

    // proceed to the router
    next()
  } catch (error) {
    res.status(401).send({ error: 'Please authenciate' })
  }
}

module.exports = auth
