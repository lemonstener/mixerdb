const db = require("../db");
const Ingredient = require("./ingredient");
const ExpressError = require("../expressError");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("../_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("get all ingredients", () => {
  test("getting all ingredients works", async () => {
    const ingredients = await Ingredient.getAll();
    expect(ingredients.length).toBe(4);
  });
});

describe("get random ingredients works", () => {
  test("getting random ingredients works", async () => {
    const ingredients = await Ingredient.selectRandom();
    expect(ingredients.length).toBe(4);
  });
});

describe("get single ingredient", () => {
  test("works by id", async () => {
    const ingredient = await Ingredient.getById(1);
    expect(ingredient).toEqual({
      id: 1,
      name: "Vodka",
      type: "Vodka",
      img_sm:
        "https://www.thecocktaildb.com/images/ingredients/Vodka-Small.png",
      img_md:
        "https://www.thecocktaildb.com/images/ingredients/Vodka-Medium.png",
      img_lg: "https://www.thecocktaildb.com/images/ingredients/Vodka.png",
    });
  });
  test("error handling by id", async () => {
    try {
      await Ingredient.getById(100);
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
  test("works by name", async () => {
    const ingredient = await Ingredient.getByName("vodka");
    expect(ingredient).toEqual({
      id: 1,
      name: "Vodka",
      type: "Vodka",
      img_sm:
        "https://www.thecocktaildb.com/images/ingredients/Vodka-Small.png",
      img_md:
        "https://www.thecocktaildb.com/images/ingredients/Vodka-Medium.png",
      img_lg: "https://www.thecocktaildb.com/images/ingredients/Vodka.png",
    });
  });
  test("error handling by name", async () => {
    try {
      await Ingredient.getByName("Stuff");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("get ingredients by search term", () => {
  test("partial match works", async () => {
    const ingredients = await Ingredient.getLike("Vod");
    expect(ingredients.length).toBe(1);
  });
  test("partial match is case insensitive", async () => {
    const ingredients = await Ingredient.getLike("vOd");
    expect(ingredients.length).toBe(1);
  });
  test("partial match error handling", async () => {
    try {
      await Ingredient.getLike("dsjkfhjdskhf");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("get by type", () => {
  test("get by type works", async () => {
    const ingredients = await Ingredient.getByType("soft drink");
    expect(ingredients.length).toBe(1);
  });
  test("get by type error handling", async () => {
    try {
      await Ingredient.getByType("Get by type must an exact match");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("cocktail ingredients by id", () => {
  test("it works", async () => {
    const cocktails1 = await Ingredient.getCocktails(2);
    const cocktails2 = await Ingredient.getCocktails(4);
    expect(cocktails1.length).toBe(1);
    expect(cocktails2.length).toBe(2);
    expect(cocktails1).toEqual([
      { id: 1, name: "Gin Cocktail", img: "some image.jpeg" },
    ]);
    expect(cocktails2).toEqual([
      {
        id: 2,
        name: "Whiskey and Coke",
        img: "some image.jpeg",
      },
      {
        id: 4,
        name: "Vodka and Coke",
        img: "some image.jpeg",
      },
    ]);
  });
  test("cocktail ingredients by id error handling", async () => {
    try {
      await Ingredient.getCocktails(100);
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("cocktail ingredients by name", () => {
  test("cocktail ingredients by name works", async () => {
    const cocktails1 = await Ingredient.getCocktailsByName("gin");
    const cocktails2 = await Ingredient.getCocktailsByName("coca-cola");
    expect(cocktails1.length).toBe(1);
    expect(cocktails2.length).toBe(2);
    expect(cocktails1).toEqual([
      { id: 1, name: "Gin Cocktail", img: "some image.jpeg" },
    ]);
    expect(cocktails2).toEqual([
      {
        id: 2,
        name: "Whiskey and Coke",
        img: "some image.jpeg",
      },
      {
        id: 4,
        name: "Vodka and Coke",
        img: "some image.jpeg",
      },
    ]);
  });
  test("cocktail ingredients by name error handling", async () => {
    try {
      await Ingredient.getCocktailsByName("hamana hamana");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});
