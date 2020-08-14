// init

const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

//findOrCreate module for using function in passport
const findOrCreate = require('mongoose-findorcreate')

//userSchema
const userSchema = new mongoose.Schema({
    googleId: { type: String, index: true, unique: true },
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'googleId', saltField: process.env.SALT, hashField: process.env.HASH })
userSchema.plugin(findOrCreate);

const User = mongoose.model('user', userSchema, 'user');
module.exports = User