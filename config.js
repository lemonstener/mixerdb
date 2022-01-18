const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///mixer_db_test"
    : "postgresql:///mixer_db";

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "se435cr4345et-mi334x675ology-m11ix12312ing-mix124es-a1234nd-se24crets12";

const BCRYPT_WORK_FACTOR = 12;

const PORT = +process.env.PORT || 3001;

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  PORT,
};
