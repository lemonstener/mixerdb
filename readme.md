# Mixer DB

![Mixer!](logo192.png)

## Table of Contents
 - [Overview](#overview)
 - [Technologies used](#technologies-used)
 - [How to Use](#how-to-use)
 - [Database Schema](#database-schema)
 - [How it works](#how-it-works)
 - [Routes](#routes)
      - [Ingredients](#1--ingredients) 
      - [Cocktails](#2--cocktails)
      - [Users](#3--users)
 - [Server response structure](#server-response-structure)
 - [POST requests and tokes](#post-requests-and-tokens)
 - [Security and password hashing](#security-and-password-hashing)
 - [User functionality and JWT tokens](#user-functionality-and-jwt-tokens)
 - [How favoriting a cocktail works](#how-favoriting-a-cocktail-works)
 - [Test coverage](#test-coverage)
 - [Credits](#credits)

## Overview

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

The models folder contains 3 .js files (one each for cocktails, ingredients and users) which contain simple class based objects with a bunch of static methods in them. Database queries are handled here. When making a request to a route the appropriate class and method will be called. This is done in order to abstract things as much as possible and keep the routes clean and easy to read. 

## Routes

1. ### Ingredients:
   - GET /ingredients --> get all ingredients from the db
   - GET /ingredients/random --> get 5 random ingredients
   - GET /ingredients/id/:id --> get single ingredient by id
   - GET /ingredients/name/:name --> get single ingredient by name (exact match)
   - GET /ingredients/like/:name --> get multiple ingredients that partially match the name
   - GET /ingredients/type/:type --> get multiple ingredients by type
   - GET /ingredients/cocktails/:id --> get all cocktails that contain this ingredient by id (exact match)
   - GET /ingredients/cocktails/name/:name --> get all cocktails that contain said ingredient by name (exact match)

2. ### Cocktails:
    - GET /cocktails --> get all cocktails from the db.
    - GET /cocktails/random --> get 20 random cocktails.
    - GET /cocktails/id/:id --> get single cocktail by id (also displays ingredients).
    - GET /cocktails/name/:name --> get single cocktail by name (exact match. Also displays ingredients).
    - GET /cocktails/like/:name --> get multiple cocktails that partially match the name.
    - POST /cocktails/favorite/:id --> favorite/unfavorite a cocktail, returns a message with the result of the request (token must be provided in the body of the request). 

3. ### Users:
   - POST /register --> create a new account, returns a JWT token. Must provide a username, email and password in the body of the request. Different users cannot share the same username or email. Username and password must be at least 5 characters long while email must respect the rules of the email format, ex: somedude@mail.com.
   - POST /login --> login to your account, returns a JWT token. Must provide a username and password in the body of the request.
   - GET /:name --> search a user by name (exact match). Also brings up that users favorite cocktails.

## Server response structure

When sending a GET request for a single item (such as a cocktail or ingredient) the server will return a single JSON object like this:

     {
	"id": 3,
	"name": "Dry Martini",
	"img": "https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg",
	"instructions": "Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Squeeze oil from lemon peel onto the drink, or garnish with olive.",
	"likes": 0,
	"ingredients": [
		{
			"id": 2,
			"name": "Gin",
			"type": "Gin",
			"img_sm": "https://www.thecocktaildb.com/images/ingredients/Gin-Small.png",
			"img_md": "https://www.thecocktaildb.com/images/ingredients/Gin-Medium.png",
			"img_lg": "https://www.thecocktaildb.com/images/ingredients/Gin.png",
			"measure": "1 2/3 oz "
		},
		{
			"id": 161,
			"name": "Dry Vermouth",
			"type": "Fortified Wine",
			"img_sm": "https://www.thecocktaildb.com/images/ingredients/Dry%20Vermouth-Small.png",
			"img_md": "https://www.thecocktaildb.com/images/ingredients/Dry%20Vermouth-Medium.png",
			"img_lg": "https://www.thecocktaildb.com/images/ingredients/Dry%20Vermouth.png",
			"measure": "1/3 oz "
		},
		{
			"id": 277,
			"name": "Olive",
			"type": "null",
			"img_sm": "https://www.thecocktaildb.com/images/ingredients/Olive-Small.png",
			"img_md": "https://www.thecocktaildb.com/images/ingredients/Olive-Medium.png",
			"img_lg": "https://www.thecocktaildb.com/images/ingredients/Olive.png",
			"measure": "1 "
		   }
	     ]
      }

Routes that return multiple results (such as **/cocktails/like/:your term**) will give you an array with objects:

    [
	{
		"id": 6,
		"name": "Long Island Tea",
		"img": "https://www.thecocktaildb.com/images/media/drink/nkwr4c1606770558.jpg",
		"likes": 0
	},
	{
		"id": 275,
		"name": "Long vodka",
		"img": "https://www.thecocktaildb.com/images/media/drink/9179i01503565212.jpg",
		"likes": 0
	},
	{
		"id": 380,
		"name": "3-Mile Long Island Iced Tea",
		"img": "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
		"likes": 0
	},
	{
		"id": 444,
		"name": "Radioactive Long Island Iced Tea",
		"img": "https://www.thecocktaildb.com/images/media/drink/rdvqmh1503563512.jpg",
		"likes": 0
	},
	{
		"id": 506,
		"name": "Long Island Iced Tea",
		"img": "https://www.thecocktaildb.com/images/media/drink/wx7hsg1504370510.jpg",
		"likes": 0
	},
	{
		"id": 558,
		"name": "A Furlong Too Late",
		"img": "https://www.thecocktaildb.com/images/media/drink/ssxvww1472669166.jpg",
		"likes": 0
	}
      ]

Note that ingredient composition of a cocktail is only provided for routes that return a single item.

## POST requests and tokens

To create a new account the body of the POST request must look like this:

      {
         "username" : "your account",
         "email": "youremail@someprovider.com",
         "password": "your-password"
      }

If logging in then email does not need to be provided.

The server will respond with a JWT token on successful login and register requests:

     {
	   "_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0MSIsImlhdCI6MTY0NDUxMzU2M30.-8YjOWrP0kJIwucewr1pWGnVtmkqpcs8VCgYeahQENI"
     }

JWT tokens are needed in order to add to and remove cocktails from your "favorites" page. When sending a request to **/cocktails/favorite/:cocktail-id** you must provide the same token you were issued in the body of the request. Tokens are used by the server to verify that you are logged in as well as to make sure that you are the correct user.

## Security and password hashing

This application uses bCrypt for password hashing for added security. When creating a new account the password is stored in encrypted format to the database. You do not have to provide the encrypted version of your password when logging in, simply type it in the body of the request the way you originally wrote it and the application will do the rest. For more detailed information on how it works check out the **user.js** file in the models folder.

## User functionality and JWT tokens

Cocktails, ingredients and users can be browsed freely and do not require any authentication or registration. However, adding or removing cocktails from a favorite page requires you to provide a **json web token** in the body of the request. 

## How favoriting a cocktail works

When making a request to the **/cocktails/favorite/:id** route (and assuming you provided the correct token) the application runs a query in the **fav_cocktails** table and looks for a relationship between the user id and the cocktail id. If one does not exist it will be created, else it will be removed. The application then increases or decreases the total number of likes for that cocktail by 1 in the **cocktails** table depending on the result. In other words: you visit the same route to favorite or unfavorite a cocktail, it's that easy.

## Test coverage

Tested all model and route files using Jest.

![Test-coverage!](test-coverage.png)

## Credits

All cocktail and ingredient information was taken from the **Cocktaildb** --> https://www.thecocktaildb.com/

Remember to drink responsibly and not go anywhere near this application unless you're at least 21 years of age.

![Gatsby!](https://media1.giphy.com/media/u4CY9BW4umAfu/200.gif)
