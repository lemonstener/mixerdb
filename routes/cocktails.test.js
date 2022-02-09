"use strict";
const request = require("supertest");
const app = require("../app");

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

describe("/cocktails", () => {
  test("get all cocktails", async () => {
    const res = await request(app).get("/cocktails");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(4);
  });
});

describe("/cocktails/random", () => {
  test("get random cocktails", async () => {
    const res = await request(app).get("/cocktails/random");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(4);
  });
});

describe("/cocktails/id/:id", () => {
  test("get cocktail by id works", async () => {
    const res = await request(app).get("/cocktails/id/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Gin Cocktail");
    expect(res.body.ingredients.length).toBe(1);
  });
  test("throw error if invalid id", async () => {
    const res = await request(app).get("/cocktails/id/100");
    expect(res.statusCode).toBe(404);
  });
});

describe("/cocktails/name/:name", () => {
  test("get cocktail by name", async () => {
    const res = await request(app).get("/cocktails/name/gin cocktail");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Gin Cocktail");
  });
  test("throw if invalid name", async () => {
    const res = await request(app).get("/cocktails/name/hamana hamana");
    expect(res.statusCode).toBe(404);
  });
});

describe("/cocktails/like/:name", () => {
  test("get cocktails by partial match", async () => {
    const res = await request(app).get("/cocktails/like/whis");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe("Whiskey and Coke");
    expect(res.body[1].name).toBe("Whiskey and Vodka");
  });
});
