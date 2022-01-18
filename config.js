require("dotenv").config();

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "se435cr4345et-mi334x675ology-m11ix12312ing-mix124es-a1234nd-se24crets12";

const BCRYPT_WORK_FACTOR = 12;

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "mixer_db_test"
    : process.env.DATABASE_URL || "mixer_db";
}

module.exports = {
  getDatabaseUri,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  PORT,
};
