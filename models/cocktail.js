const db = require("../db");
const ExpressError = require("../expressError");

class Cocktail {
  static async getAll() {
    const result = await db.query(`
        SELECT * 
        FROM cocktails
        ORDER BY id`);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(
      `
    SELECT id,name,img,ingredients,measurments,instructions
    FROM cocktails
    WHERE id=$1`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Cocktail Not Found", 404);
    }
    return result.rows[0];
  }

  static async getByName(name) {
    const result = await db.query(
      `
    SELECT id,name,img,ingredients,measurments,instructions
    FROM cocktails
    WHERE LOWER(name)=$1`,
      [name]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Cocktail Not Found", 404);
    }
    return result.rows[0];
  }

  static async getLike(name) {
    const str = `%${name}%`;
    const result = await db.query(
      `
      SELECT id,name,img,ingredients,measurments,instructions
      FROM cocktails
      WHERE LOWER(name) LIKE $1
      `,
      [str]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Cocktail Not Found", 404);
    }
    return result.rows;
  }
}

module.exports = Cocktail;
