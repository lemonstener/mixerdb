# Mixer DB

## Overview
![Mixer!](logo192.png)

Welcome to the MixerDB repository! 

Mixer DB is cocktail database that contains hundreds of cocktails and ingredients plus user functionality. This repository contains all of the files needed to create a fully functional database along with an API to easily find what you need. MixerDB is also deployed on Heroku.

**Total number of ingredients**: 481

**Total number of cocktails**: 563


## Technologies used

Node.js, Express.js, PostgreSQL

## How to Use
1. Clone this repository
2. **npm install** in the terminal to install the modules
3. **npm start** in the terminal to start the server

## Database Schema


![Schema!](db-schema.png)

## How it works

The models folder contains 3 .js files (one each for cocktails, ingredients and users) which contain a class with a bunch of static methods. Database queries are handled here. When making a request to a route the appropriate class and method will be called. This is done in order to abstract things as much as possible and keep the routes clean and easy to read. 

## Routes

1. Ingredients:
   - GET /ingredients --> get all ingredients from the db
   - GET /ingredients/random --> get 5 random ingredients
   - GET /ingredients/id/:id --> get single ingredient by id
   - GET /ingredients/name/:name --> get single ingredient by name (exact match)
   - GET /ingredients/like/:name --> get multiple ingredients that partially match the name
   - GET /ingredients/type/:type --> get multiple ingredients by type
   - GET /ingredients/cocktails/:id --> get all cocktails that contain this ingredient by id (exact match)
   - GET /ingredients/cocktails/name/:name --> get all cocktails that contain said ingredient by name (exact match)

2. Cocktails:
    - GET /cocktails --> get all cocktails from the db.
    - GET /cocktails/random --> get 20 random cocktails.
    - GET /cocktails/id/:id --> get single cocktail by id (also displays ingredients).
    - GET /cocktails/name/:name --> get single cocktail by name (exact match. Also displays ingredients).
    - GET /cocktails/like/:name --> get multiple cocktails that partially match the name.
    - POST /cocktails/favorite/:id --> favorite/unfavorite a cocktail, returns a message with the result of the request (token must be provided in the body of the request). 

3. Users:
   - POST /register --> create a new account, returns a JWT token. Must provide a username, email and password in the body of the request. Different users cannot share the same username or email. Username and password must be at least 5 characters long while email must respect the rules of the email format, ex: somedude@mail.com.
   - POST /login --> login to your account, returns a JWT token. Must provide a username and password in the body of the request.
   - GET /:name --> search a user by name (exact match). Also brings up that users favorite cocktails.

## Security and password hashing

This application uses bCrypt for password hashing for added security. When creating a new account the password is stored in encrypted format to the database. You do not have to provide the encrypted version of your password when logging in, simply type it in the body of the request the way you originally wrote it and the application will do the rest. For more detailed information on how it works check out the **user.js** file in the models folder.

## User functionality and tokens

Cocktails, ingredients and users can be browsed freely and do not require any authentication or registration. However, adding or removing cocktails from a favorite page requires you to provide a **json web token** in the body of the request. 

## How favoriting a cocktail works

When making a request to the **/cocktails/favorite/:id** route (and assuming you provided the correct token) the application runs a query in the **fav_cocktails** table and looks for a relationship between the user id and the cocktail id. If one does not exist it will be created, else it will be removed. The application then increases or decreases the total number of likes for that cocktail by 1 in the **cocktails** table depending on the result. In other words: you visit the same route to favorite or unfavorite a cocktail, it's that easy.

## Credits

All cocktail and ingredient information was taken from the **Cocktaildb** --> https://www.thecocktaildb.com/

Remember to drink responsibly and not go anywhere near this application unless you're at least 21 years of age.

![Gatsby!](https://media1.giphy.com/media/u4CY9BW4umAfu/200.gif)
