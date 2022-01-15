const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const User = require("../models/user");
const userRegisterSchema = require("../schemas/userRegister.json");
const userLoginSchema = require("../schemas/userLogin.json");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");

router.post("/register", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errors = validator.errors.map((e) => e.stack);
      throw new ExpressError(errors, 400);
    }
    const { username, password, email } = req.body;
    const user = await User.register(username, email, password);
    const token = jwt.sign(user, SECRET_KEY);
    return res.status(200).json({ _token: token });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userLoginSchema);
    if (!validator.valid) {
      const errors = validator.errors.map((e) => e.stack);
      throw new ExpressError(errors, 400);
    }
    const { username, password } = req.body;
    const user = await User.login(username, password);
    user.test = true;
    const token = jwt.sign(user, SECRET_KEY);
    return res.status(200).json({ _token: token });
  } catch (error) {
    return next(error);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const user = await User.getByUsername(req.params.name);
    if (user.rows.length > 0) {
      return res.status(200).json(user.rows[0]);
    } else {
      throw new ExpressError("User Not Found", 404);
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/favorites/:id", async (req, res, next) => {
  try {
    const result = await User.getFavorites(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
