const express = require("express");
const router = new express.Router();
const Ingredient = require("../models/ingredient");

router.get("/", async (req, res, next) => {
  const result = await Ingredient.getAll();
  return res.status(200).json(result);
});

router.get("/random", async (req, res, next) => {
  const result = await Ingredient.selectRandom();
  return res.status(200).json(result);
});

router.get("/id/:id", async (req, res, next) => {
  try {
    const result = await Ingredient.getById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/name/:name", async (req, res, next) => {
  try {
    const result = await Ingredient.getByName(req.params.name);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/like/:name", async (req, res, next) => {
  try {
    const result = await Ingredient.getLike(req.params.name);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/type/:type", async (req, res, next) => {
  try {
    const result = await Ingredient.getByType(req.params.type);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/cocktails/:id", async (req, res, next) => {
  try {
    const result = await Ingredient.getById(req.params.id);
    result.cocktails = await Ingredient.getCocktails(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/cocktails/name/:name", async (req, res, next) => {
  try {
    const result = await Ingredient.getByName(req.params.name);
    result.cocktails = await Ingredient.getCocktails(result.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
