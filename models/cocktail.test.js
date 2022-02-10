"use strict";
const db = require("../db");
const Cocktail = require("./cocktail");
const ExpressError = require("../expressError");

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("../_testCommon");

beforeAll(async () => {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM fav_cocktails");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=1");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=2");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=3");
  await db.query("UPDATE cocktails SET likes=0 WHERE id=4");
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("get all cocktails", () => {
  test("getting all cocktails works", async () => {
    const cocktails = await Cocktail.getAll();
    expect(cocktails.length).toEqual(4);
    expect(cocktails).toEqual([
      {
        id: 1,
        name: "Gin Cocktail",
        img: "some image.jpeg",
        likes: 0,
      },
      {
        id: 2,
        name: "Whiskey and Coke",
        img: "some image.jpeg",
        likes: 0,
      },
      {
        id: 3,
        name: "Whiskey and Vodka",
        img: "some image.jpeg",
        likes: 0,
      },
      {
        id: 4,
        name: "Vodka and Coke",
        img: "some image.jpeg",
        likes: 0,
      },
    ]);
  });
});

describe("get random cocktails", () => {
  test("random cocktails works", async () => {
    const cocktails = await Cocktail.selectRandom();
    expect(cocktails.length).toBe(4);
  });
});

describe("get a single cocktail", () => {
  test("cocktail by id works", async () => {
    const cocktail = await Cocktail.getById(1);
    expect(cocktail.id).toBe(1);
  });
  test("error handling: non existend id", async () => {
    try {
      await Cocktail.getById(100);
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
  test("cocktail by name works", async () => {
    const cocktail = await Cocktail.getByName("gin cocktail");
    expect(cocktail.name).toEqual("Gin Cocktail");
  });
  test("error handling: non existent name", async () => {
    try {
      await Cocktail.getByName("Mumbo Jumbo");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("get cocktails that match search term", () => {
  test("partial match works", async () => {
    const cocktais = await Cocktail.getLike("coke");
    expect(cocktais.length).toBe(2);
    expect(cocktais).toEqual([
      {
        id: 2,
        name: "Whiskey and Coke",
        img: "some image.jpeg",
        likes: 0,
      },
      {
        id: 4,
        name: "Vodka and Coke",
        img: "some image.jpeg",
        likes: 0,
      },
    ]);
  });
  test("partial match is case insensitive", async () => {
    const cocktais = await Cocktail.getLike("cOkE");
    expect(cocktais.length).toBe(2);
    expect(cocktais).toEqual([
      {
        id: 2,
        name: "Whiskey and Coke",
        img: "some image.jpeg",
        likes: 0,
      },
      {
        id: 4,
        name: "Vodka and Coke",
        img: "some image.jpeg",
        likes: 0,
      },
    ]);
  });
  test("partial match error handling works", async () => {
    try {
      await Cocktail.getLike("hamana hamana");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("get cocktail ingredients", () => {
  test("getting cocktail ingredients works", async () => {
    const ingredients = await Cocktail.getIngredients(2);
    expect(ingredients.length).toBe(2);
    expect(ingredients).toEqual([
      {
        id: 3,
        name: "Whiskey",
        type: "Whisky",
        img_sm:
          "https://www.thecocktaildb.com/images/ingredients/Whiskey-Small.png",
        img_md:
          "https://www.thecocktaildb.com/images/ingredients/Whiskey-Medium.png",
        img_lg: "https://www.thecocktaildb.com/images/ingredients/Whiskey.png",
        measure: "2oz",
      },
      {
        id: 4,
        name: "Coca-Cola",
        type: "Soft Drink",
        img_sm:
          "https://www.thecocktaildb.com/images/ingredients/Coca-Cola-Small.png",
        img_md:
          "https://www.thecocktaildb.com/images/ingredients/Coca-Cola-Medium.png",
        img_lg:
          "https://www.thecocktaildb.com/images/ingredients/Coca-Cola.png",
        measure: "2oz",
      },
    ]);
  });
  test("error handling", async () => {
    try {
      await Cocktail.getIngredients(100);
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("like functionality", () => {
  test("inreasing and decreasing likes works", async () => {
    await Cocktail.increaseLikes(1);
    let cocktail = await Cocktail.getById(1);
    expect(cocktail.likes).toBe(1);
    await Cocktail.decreaseLikes(1);
    cocktail = await Cocktail.getById(1);
    expect(cocktail.likes).toBe(0);
  });
});
