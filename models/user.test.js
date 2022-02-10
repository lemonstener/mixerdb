"use strict";
const db = require("../db");
const User = require("./user");
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
  // const user1 = await User.register("test1", "test1@email.com", "password1");
  // const user2 = await User.register("test2", "test2@email.com", "password2");
  // await User.favCocktail(user1.id, 1);
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("user registration", () => {
  test("user registration works", async () => {
    const user = await User.register("test3", "test3@email.com", "password3");
    expect(user.username).toEqual("test3");
  });
  test("username must be unique", async () => {
    await User.register("test10", "test10@email.com", "password3");
    try {
      await User.register("test10", "test34@email.com", "password3");
    } catch (error) {
      expect(error instanceof ExpressError).toBeTruthy();
    }
  });
  test("email must be unique", async () => {
    try {
      await User.register("test2349", "test3@email.com", "password3");
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
