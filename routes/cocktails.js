const express = require("express");
const router = new express.Router();
const Cocktail = require("../models/cocktail");

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
    result.ingredients = await Cocktail.getIngredients(result.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
