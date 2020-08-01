// init
const { google } = require('googleapis')
const jwt = require('jsonwebtoken')


/* Accessing Credential provided by Google to initial Google Login */
const CLIENT_ID = process.env.CLIENT_ID   
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URI

/* New oAuth2Client using credential provided above */
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)


const generateAccessToken = async function(req, res, next) {  // Function to generate Access Token from Auth. Code (used as Middleware)
  try{
    if(req.query.code){
      const code = req.query.code
      try{
        const { tokens } = await oAuth2Client.getToken(code) // Generating token by Verifying Code
        // oAuth2Client.setCredentials(tokens)  // use for generating refresh token for later time 
        req.id_token = tokens.id_token // setting an id_token property on req object
        next()
      }catch(e) {
        res.send({"error" : e})
      }
    }else{
        res.send({"error" : "invalid request"})
    }
  }catch(e){
    res.send({"error" : e})
  }
}

const verifyToken = async (req, res, next) => { // Function to verify jwt token and email set on cookie are not tampered, useful in case someone changed cookie
  const token = req.cookies.jwtToken || '' 
  try {
    if(!token) {
      res.send({"error" : "You need to login first"})
    }
    if(token){
      const decrypt = await jwt.verify(token, process.env.JWT_SECRET_KEY) // Decrypting jwt Token
      if(decrypt.email !== req.cookies.email){  // checks if email (on cookie) and email embedded on token by generateAuthToken fumction (defined in ../models/user.js) hasn't been tampered 
        res.send({"error" : "invalid request"})
      }
      next()
    }
    
  } catch(e) {
    res.send({"error" : e}) // In case someone has changed jwt Token or token has expired
  }
}


module.exports = {
    generateAccessToken,
    verifyToken
}
