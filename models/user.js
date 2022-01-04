const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

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
    RETURNING username
    `,
      [username, email, hashedPassword]
    );

    const user = result.rows[0];
    return user;
  }

  static async login(username, password) {
    const result = await db.query(
      `
      SELECT username,password
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
}

module.exports = User;
