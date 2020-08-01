require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')    
const cookieParser = require('cookie-parser')

require('./db/mongoose')

const indexRouter = require('./routers/index')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../client')

app.set('view engine', 'ejs')
app.set('views', publicDirectoryPath)

app.use(express.static(publicDirectoryPath, { index: '_' })) 
app.use(cors())
app.use(cookieParser())
app.use(indexRouter)

module.exports = app
