# Bluff

### BACKEND README
- run node server/index.js or npm start to run server (do not forget to install dependencies first by doing npm i)

- all starting setup for authentication etc are in server/app.js

- all routes are at server/index.js

- all passport configuration are at server/middleware/auth.js

- all database requirement files are at server/db

- all models are at server/models

### backend working

- starting route is at '' which redirects it to result page which will check for authentication and if not authenticated would redirect to '/login' route else will render index.ejs

- at login route would google sign in box will open for sign in

- after sucessfull sign in, we would save user's google id in database and create a cookie containing that id(hashed and salted). then it would be redirected back to '/auth/google/home'

- here we authenticate and will set that cookie to req.user object so that we could id for further use with user.then we would be redirected to '/result' route.

- at result route,we would check is user logged in if he is logged in we would render 'index.ejs' else we would redirect it to 'login' route
