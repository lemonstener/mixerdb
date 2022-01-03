const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const msg = error.msg;
  res.status(status).send(error.msg);
});

module.exports = app;
