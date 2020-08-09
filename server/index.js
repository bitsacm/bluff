//importing app
const app = require('./app')
//port as enviroment variable
const port = process.env.PORT || 3000
//server up check
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
