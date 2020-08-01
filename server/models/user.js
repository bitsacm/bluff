// init
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    un : {  // username
        type: String,
        unique : true,
        required : true,
        index : true,
        alias : 'username'
    },
    fn : { // first Name
        type : String,
        alias : 'firstName',
        index : true,
    },
    ln : { // last Name
        type : String,
        alias : 'lastName'
    },
    email : {
        type : String,
        required : true,
        index : true
    },
    a : { // avatar
        type : String,
        alias : 'avatar'
    },
    currentGame : { // current Game details
        gameLobby : {
            type : String,
            trim : true,
            lowercase : true
        },
        currentScore : Number
    },
    positionInGame : {
        bestScore : {
            type : Number,
            default : 0
        },
        rank : {
            type : Number
        }
    },
    tokens : [{ // helps in logging out user in case of multiple device login
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.set('autoIndex', false) 

userSchema.methods.generateAuthToken = async function (res) { // function for instance of userSchema
    const token = jwt.sign({email : this.email }, process.env.JWT_SECRET_KEY, {expiresIn : '7d'} ) // generating jwt token with user email embedded in it
    this.tokens = this.tokens.concat({token})
    
    /*Setting up Cookie*/
    res.cookie("jwtToken", token)
    res.cookie("email", this.email)
    
    await this.save()
    return token
}

const userModel = mongoose.model('user', userSchema)
module.exports =  userModel