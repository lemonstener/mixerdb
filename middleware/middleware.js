const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,POST");
  next();
};

module.exports = { allowCrossDomain };
