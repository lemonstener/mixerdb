"use strict";
const db = require("../db");
const User = require("./user");
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

describe("user registration", () => {
  test("user registration works", async () => {
    const user = await User.register("test3", "test3@email.com", "password3");
    expect(user.username).toEqual("test3");
  });
  test("username must be unique", async () => {
    try {
      await User.register("test1", "test3@email.com", "password3");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
  test("email must be unique", async () => {
    try {
      await User.register("test2", "test3@email.com", "password3");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("user login", () => {
  test("user login works", async () => {
    const user = await User.login("test1", "password1");
    expect(user.username).toBe("test1");
  });
  test("incorrect password", async () => {
    try {
      await User.login("test1", "password2");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
});

describe("get user info", () => {
  test("getting user information works", async () => {
    const userInfo = await User.getByUsername("test1");
    expect(userInfo.username).toEqual("test1");
  });
});

describe("get user favorites", () => {
  test("getting user favorites works", async () => {
    const user = await User.login("test1", "password1");
    const favorites = await User.getFavorites(user.id);
    expect(favorites.length).toEqual(1);
  });
});

describe("adding/removing from favorites", () => {
  test("adding to and removing from favorites", async () => {
    const user = await User.login("test1", "password1");
    await User.favCocktail(user.id, 2);
    let favorites = await User.getFavorites(user.id);
    expect(favorites.length).toBe(2);
    await User.favCocktail(user.id, 1);
    favorites = await User.getFavorites(user.id);
    expect(favorites.length).toBe(1);
  });
});
