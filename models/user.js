const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const Cocktail = require("./cocktail");

class User {
  static async getByUsername(username) {
    const user = await db.query(
      `
      SELECT username
      FROM users
      WHERE username=$1
    `,
      [username]
    );

    return user;
  }

  static async getByEmail(email) {
    const user = await db.query(
      `
      SELECT email
      FROM users
      WHERE email=$1
      `,
      [email]
    );

    return user;
  }

  static async register(username, email, password) {
    const duplicateUsername = await this.getByUsername(username);

    if (duplicateUsername.rows[0]) {
      throw new ExpressError("Username already taken", 400);
    }

    const duplicateEmail = await this.getByEmail(email);

    if (duplicateEmail.rows[0]) {
      throw new ExpressError(
        "Someone is already registered to this email",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `
    INSERT INTO users
    (username,email,password)
    VALUES
    ($1,$2,$3)
    RETURNING id,username
    `,
      [username, email, hashedPassword]
    );

    const user = result.rows[0];
    return user;
  }

  static async login(username, password) {
    const result = await db.query(
      `
      SELECT id,username,password
      FROM users
      WHERE username=$1
      `,
      [username]
    );
    const user = result.rows[0];

    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        delete user.password;
        return user;
      }
    }
    throw new ExpressError("Invalid username/password", 400);
  }

  static async getFavorites(id) {
    const result = await db.query(
      `
      SELECT id,name,img
      FROM cocktails AS c
      JOIN fav_cocktails AS fc
      ON fc.cocktail_id = c.id
      WHERE user_id=$1
      `,
      [id]
    );
    return result.rows;
  }

  static async favCocktail(user_id, cocktail_id) {
    const favorites = await User.getFavorites(user_id);
    const ids = favorites.map((c) => c.id);
    let msg;
    let code;
    if (!ids.includes(+cocktail_id)) {
      await db.query(
        `
      INSERT INTO fav_cocktails
      (user_id,cocktail_id)
      VALUES
      ($1,$2)
      `,
        [user_id, cocktail_id]
      );

      await Cocktail.increaseLikes(cocktail_id);
      msg = "Added to favorites";
      code = 201;
    } else {
      await db.query(
        `
        DELETE FROM fav_cocktails 
        WHERE user_id=$1 AND cocktail_id=$2
        `,
        [user_id, cocktail_id]
      );
      await Cocktail.decreaseLikes(cocktail_id);
      msg = "Removed from favorites";
      code = 200;
    }
    return { msg, code };
  }
}

module.exports = User;
