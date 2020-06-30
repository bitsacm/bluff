const express = require('express'); 
const path = require('path'); 

require('./db/mongoose');

const indexRouter = require('./routers/index');

const app = express(); 

const publicDirectoryPath = path.join(__dirname, '../public'); 

app.set('view engine', 'ejs');
app.set('views', publicDirectoryPath); 

app.use(indexRouter);

module.exports = app;
