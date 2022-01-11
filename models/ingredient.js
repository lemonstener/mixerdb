const db = require("../db");
const ExpressError = require("../expressError");

class Ingredient {
  static async getAll() {
    const result = await db.query(
      `
    SELECT * 
    FROM ingredients
    ORDER BY id
    `
    );

    return result.rows;
  }

  static async selectRandom() {
    const result = await db.query(
      `
      SELECT id,name,type,img_sm,img_md,img_lg
      FROM ingredients
      ORDER BY RANDOM()
      LIMIT 5;
      `
    );

    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(
      `
    SELECT id,name,type,img_sm,img_md,img_lg
    FROM ingredients
    WHERE id=$1`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Ingredient Not Found", 404);
    }

    return result.rows[0];
  }

  static async getByName(name) {
    const result = await db.query(
      `
    SELECT id,name,type,img_sm,img_md,img_lg
    FROM ingredients
    WHERE LOWER(name)=$1`,
      [name]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Ingredient Not Found", 404);
    }
    return result.rows[0];
  }

  static async getLike(name) {
    const str = `%${name}%`;
    const result = await db.query(
      `
      SELECT id,name,type,img_sm,img_md,img_lg
      FROM ingredients
      WHERE LOWER(name) LIKE $1
      `,
      [str]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Ingredient Not Found", 404);
    }
    return result.rows;
  }

  static async getByType(type) {
    const result = await db.query(
      `
    SELECT id,name,type,img_sm,img_md,img_lg
    FROM ingredients 
    WHERE LOWER(type)=$1
    `,
      [type]
    );

    if (result.rows.length === 0) {
      throw new ExpressError("No Ingredients Found", 404);
    }
    return result.rows;
  }

  static async getCocktails(id) {
    const result = await db.query(
      `
    SELECT id,name,img
    FROM cocktails AS c
    JOIN cocktail_ingredients AS ci
    ON c.id = ci.cocktail_id
    WHERE ingredient_id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError("No cocktails with that ingredient", 404);
    }
    return result.rows;
  }
}

module.exports = Ingredient;
