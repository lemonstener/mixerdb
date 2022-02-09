const db = require("./db");
const User = require("./models/user");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM fav_cocktails");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=1");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=2");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=3");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=4");
  const user1 = await User.register("test1", "test1@email.com", "password1");
  const user2 = await User.register("test2", "test2@email.com", "password2");
  await User.favCocktail(user1.id, 1);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
