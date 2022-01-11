# Mixer DB

## Overview

Welcome to the MixerDB repository! 

Mixer DB is cocktail database that contains hundreds of cocktails and ingredients plus user functionality. This repository contains all of the files needed to create a fully functional database along with an API to easily find what you need.

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

## Routes

1. Ingredients:
   - GET /ingredients --> get all ingredients from the db
   - GET /ingredients/random --> get 5 random ingredients
   - GET /ingredients/id/:id --> get single ingredient by id
   - GET /ingredients/name/:name --> get single ingredient by name (exact match)
   - GET /ingredients/like/:name --> get multiple ingredients that partially match the name
   - GET /ingredients/type/:type --> get multiple ingredients by type
   - GET /ingredients/cocktails/:id --> get all cocktails that contain this ingredient by id (exact match)

2. Cocktails:
    - GET /cocktails --> get all cocktails from the db
    - GET /cocktails/random --> get 5 random cocktails
    - GET /cocktails/id/:id --> get single cocktail by id (also displays ingredients)
    - GET /cocktails/name/:name --> get single cocktail by name (exact match. Also displays ingredients)
    - GET /cocktails/like/:name --> get multiple cocktails that partially match the name
    - POST /cocktails/favorite/:id --> favorite/unfavorite a cocktail (user must be logged in and provide a token)

3. Users:
   - POST /register --> create a new account, returns a token
   - POST /login --> login to account, returns a token
   - GET /:name --> search a user by name
   - GET /favorites/:id --> get favorite cocktails of user by id

## Credits

All cocktail and ingredient information was taken from the **Cocktaildb** --> https://www.thecocktaildb.com/

Remember to drink responsibly and not go anywhere near this application unless you're at least 21 years of age.

![Gatsby!](https://media1.giphy.com/media/u4CY9BW4umAfu/200.gif)
