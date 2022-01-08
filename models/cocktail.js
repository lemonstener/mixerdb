const db = require("../db");
const ExpressError = require("../expressError");

class Cocktail {
  static async getAll() {
    const result = await db.query(`
        SELECT id,name,img 
        FROM cocktails
        ORDER BY id`);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(
      `
    SELECT id,name,img,instructions
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
    SELECT id,name,img,instructions
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
      SELECT id,name,img
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

  static async getIngredients(id) {
    const result = await db.query(
      `
    SELECT i.id,i.name,i.type,i.img_sm,i.img_md,i.img_lg,ci.measure
    FROM ingredients AS i
    INNER JOIN cocktail_ingredients AS ci
    ON i.id = ci.ingredient_id
    WHERE cocktail_id = $1
    `,
      [id]
    );

    return result.rows;
  }
}

module.exports = Cocktail;
