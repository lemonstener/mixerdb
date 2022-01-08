const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();
const Cocktail = require("../models/cocktail");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  const result = await Cocktail.getAll();
  return res.status(200).json(result);
});

router.get("/id/:id", async (req, res, next) => {
  try {
    const result = await Cocktail.getById(req.params.id);
    result.ingredients = await Cocktail.getIngredients(result.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/name/:name", async (req, res, next) => {
  try {
    const result = await Cocktail.getByName(req.params.name);
    result.ingredients = await Cocktail.getIngredients(result.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/like/:name", async (req, res, next) => {
  try {
    const result = await Cocktail.getLike(req.params.name);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.post("/favorite/:id", async (req, res, next) => {
  try {
    const token = req.body._token;
    const data = jwt.verify(token, SECRET_KEY);
    const { msg, code } = await User.favCocktail(data.id, req.params.id);
    return res.status(code).json(msg);
  } catch (error) {
    return next(new ExpressError("Please login first", 401));
  }
});

module.exports = router;
