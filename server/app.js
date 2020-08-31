//server setup
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: 'server/.env' });

//database setup
const mongoose = require('mongoose')
require('./db/mongoose')

//passport setup for authentication and sessions
const app = express()
const session = require('express-session');
const passport = require("passport");
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
const passports = require('./middleware/auth')

// index router for various routes
const { router } = require('./routers/index')


//file location for different ejs files
const publicDirectoryPath = path.join(__dirname, '../client')

//ejs setup
app.set('view engine', 'ejs')
app.set('views', publicDirectoryPath)
app.use(express.static(publicDirectoryPath, { index: '_' }))
app.use(router)

//exporting module for index.js
module.exports = app