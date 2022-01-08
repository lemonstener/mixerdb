const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const ingredientRoutes = require("./routes/ingredients");
const coctailRoutes = require("./routes/cocktails");
const userRoutes = require("./routes/users");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/ingredients", ingredientRoutes);
app.use("/cocktails", coctailRoutes);
app.use("/users", userRoutes);

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
