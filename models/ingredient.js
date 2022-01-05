const db = require("../db");
const ExpressError = require("../expressError");

class Ingredient {
  static async getAll() {
    const result = await db.query(`
    SELECT * 
    FROM ingredients
    ORDER BY id`);
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

  static async getCocktails(name) {
    const str1 = `${name},%`;
    const str2 = `%,${name}`;
    const str3 = `%,${name},%`;

    const result = await db.query(
      `
    SELECT id,name,img,ingredients,measurments,instructions,likes
    FROM cocktails 
    WHERE LOWER(ingredients) LIKE LOWER($1) OR 
    LOWER(ingredients) LIKE LOWER($2) OR 
    LOWER(ingredients) LIKE LOWER($3)
    ORDER BY id
    `,
      [str1, str2, str3]
    );

    return result.rows;
  }
}

module.exports = Ingredient;
