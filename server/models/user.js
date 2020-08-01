// init
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique : true,
        required : true,
        index : true,
    },
    firstName : { 
        type : String,
        index : true,
    },
    lastName : { 
        type : String,
    },
    email : {
        type : String,
        required : true,
        index : true
    },
    avatar : { 
        type : String,
    },
    currentGame : { 
        gameLobby : {
            type : String,
            trim : true,
            lowercase : true
        },
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
    tokens : [{ 
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.set('autoIndex', false) 

userSchema.methods.generateAuthToken = async function (res) { // function for instance of userSchema
    const token = jwt.sign( { email : this.email, id : this._id }, process.env.JWT_SECRET_KEY, { expiresIn : '7d' } ) // generating jwt token with user email embedded in it
    this.tokens = this.tokens.concat({ token })
    
    /*Setting up Cookie*/
    res.cookie("jwtToken", token)
    res.cookie("email", this.email)
    
    await this.save()
    return token
}

const userModel = mongoose.model('user', userSchema)
module.exports =  userModel