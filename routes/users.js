const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const User = require("../models/user");
const userRegisterSchema = require("../schemas/userRegister.json");

router.post("/register", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errors = validator.errors.map((e) => e.stack);
      throw new ExpressError(errors, 400);
    }
    const { username, password, email } = req.body;
    const user = await User.register(username, email, password);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
