# Bluff
This project aims at creating an online multiplayer game of Bluff. We will be using Vanilla JS for the frontend and Node JS along with express and socket.io for the backend.

Game Rules - https://en.wikipedia.org/wiki/Cheat_(game) We will follow the Canadian/Spanish Variant.

### Contribution 
- Both the backend and frontend of this project are broken down in multiple short steps so that you can learn as you contribute.
- Each Step will be given 2 days with a third day to review Pull requests
- At each step we would like all of you to submit your solution.
- Your code must be very well documented with proper comments and clear variable naming for it to be accepted. People building upon your code should be able to understand what your code segment does and how it does that.
- You must adhere to JavaScript standard style: https://standardjs.com/rules.html
- At every step the best Pull Request would be merged into the repository. You must clone the repository and build upon the code which had been accepted for the previous steps.
- Any changes to code that was accepted for previous steps will not be allowed. If you wish to correct an older code segment, open an issue describing exactly what you would like to change.
- If your Pull Request is not accepted do not be disheartended. We encourage you to go through the accepted code (which won't take much time as the project progresses in baby steps and will be well documented) and understand what you could have done better.
- We will rate each pull request out of 10 as we review it and mantain a points table.
- Think of it like a competition, the person with the highest score wins!

### Deploying your submission on Heroku
  - To make it easier for us to check your code deploy your fork to Heroku (www.heroku.com) by creating an app named `(your-github-username)-bluff` and include the url at the top of your Pull Request description.
  - For people working with frontend, we have already included the code which would allow you to directly deploy for fork to Heroku (deploy using github). You need not worry about configuring the server for deployment, it should be just a click for you.
  - Main deployment of the main repository will be at https://acm-bluff.herokuapp.com

### Project Structure
- All frontend code must lie in the public folder.
- Create a separate file for each and every function created. The file name should be the same as the function name. At the top of the file mention your Github username.
- Group similar functions into a folder. For example, functions helping with animations should go into one folder and game logic into another.
- Backend contributions must include documentation of each API endpoint you create in a readme file in the routers folder.

### Resources
- Frontend 
  - https://github.com/bitsacm/Slack-Stock-DAG/blob/master/frontend.md
  - https://www.w3schools.com/
- Backend 
  - https://github.com/bitsacm/Slack-Stock-DAG/blob/master/backend.md
  - Use the Andrew Mead NodeJS course (available in our google drive link) as refrence for this project.
- Github 
  - https://github.com/bitsacm/Slack-Stock-DAG/blob/master/open_source.md
  - Corey Schafer's playlist: https://www.youtube.com/playlist?list=PL-osiE80TeTuRUfjRe54Eea17-YfnOOAx
  
### Frontend
- #### Step 0 (1 day)
  - Render a deck of 54 cards to the screen (52 + 2 jokers).
  
- #### Step 1 
  - Shuffle a deck for n users(prompt an input when the page opens).
  - Add a deck for every 5th user.
  - eg - 
    - n = 4 distribute 13, 13, 14, 14 cards
    - n = 5 distribute 21, 21, 21, 21, 20 cards
  - Prompt an error in case number of players is less than 2 or exceeds 12.
  - All cards of all players should be clearly visible.
  
- #### Step 2
  - Allow users to transfer cards from their hand to a central stack. 
  - Keep track of the cards in the stack and the what the last player added to the stack.
  - Cards added to the central stack should not be visible.
  - You MUST have a move card function which when called executes the transfer of cards by invoking other relevant functions.

- #### Step 3
  - Ask users to choose what do they want to call what they have played. Let them bluff.
  - Store the result which keeps record whether the last player bluffed.
  - For all turns after after the beginning of a new round just prompt like "player 1 added 3 cards to the stack" as everyone must play the same rank card in a round. (If the round begins with ace of spdes then everyone must add or atleast claim to add aces only to the stack).
  
- #### Step 4
  - Allow users to pass. 
  - Add a timer after which the turn gets passed.
  - Allow users to check the last turn in order to catch a bluff.
  - Transfer the stack to the suitable user depending on whether the bluff was caught.
  - Trash the stack if everyone has passed once in that round.
 
- #### Step 5
  - Take input of username and roomname. This will be passed to the backend.
  - Backend sends usernames along with player numbers to the frontend.
  - Allow PLayer 1 to access a start game button, for others display - "waiting for Player 1 to start".
  - Hide the cards of other users except for the one who matches the username. (Number of cards everyone has in hand must be visible. just flip the cards to the back side).
  - Let players rearrange the cards they have in hand.
  - You MUST have a rearrange card function which when called executes the transfer of cards by invoking other relevant functions.
  - the reshuffling will be passed to the backend.
  - Bring that player to comfortable position on the screen.
  
Congratulations you have a working Bluff game (a project in alpha stage). Its now upto you to find and fix bugs, add features which you would like to have and improve the user experience.
  
### Backend
We have provided a boilerplate for the backend code which you must build upon.
- #### Step 1 (1 week)
  - Define a user model
  - Implement Google oauth2.0 logins
  - set and read authentication token in the form of a cookie.
- #### Step 2 (1 week)
  - Create utils folder which would store information of active users in array containing their usernames and roomnames.
  - Include checks which do not allow duplicate usernnames and do not allow new users into a room once it has 12 users or if the game has begun.
  - Create socket event listeners and emitters for:
    - new player joining a game
    - start game
      - This should return a list of usernames in order they joined the game and the room should be closed to new players.
    - movement of cards from hand to deck
    - shuffling of cards in hand
    - End of game - delete all players from the array. They will be redirected to the start page by the frontend.
    
 - #### Step 3 (1 week)
    - Now you will work on the client side code to add event listeners and emitters like you did at the server side.
    - Execute relevant functions on the frontend to make this a real time multiplayer game and transfer relevant information to the server to be passed onto other users.
  
Congratulations you have a working Bluff game (a project in alpha stage). Its now upto you to find and fix bugs and add features which you would like to have.
