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

describe("/ingredients", () => {
  test("get all ingredients", async () => {
    const res = await request(app).get("/ingredients");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(4);
  });
});

describe("/ingredients/random", () => {
  test("get random ingredients", async () => {
    const res = await request(app).get("/ingredients/random");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(4);
  });
});

describe("/ingredients/id/:id", () => {
  test("get ingredient by id works", async () => {
    const res = await request(app).get("/ingredients/id/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Vodka");
  });
  test("throw error if invalid id", async () => {
    const res = await request(app).get("/ingredients/id/100");
    expect(res.statusCode).toBe(404);
  });
});

describe("/ingredients/name/:name", () => {
  test("get ingredient by name", async () => {
    const res = await request(app).get("/ingredients/name/vodka");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Vodka");
  });
  test("throw error if invalid name", async () => {
    const res = await request(app).get("/ingredients/name/hamana hamana");
    expect(res.statusCode).toBe(404);
  });
});

describe("/ingredients/like/:name", () => {
  test("get ingredients by partial match", async () => {
    const res = await request(app).get("/ingredients/like/vod");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Vodka");
  });
});

describe("/ingredients/type/:type", () => {
  test("get ingredients by type", async () => {
    const res = await request(app).get("/ingredients/type/vodka");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe("/ingredients/cocktails/:id", () => {
  test("get cocktails made with ingredient by id", async () => {
    const res = await request(app).get("/ingredients/cocktails/3");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Whiskey");
    expect(res.body.cocktails.length).toBe(2);
  });
});

describe("/ingredients/cocktails/name/:name", () => {
  test("get cocktails made with ingredient by name", async () => {
    const res = await request(app).get("/ingredients/cocktails/name/whiskey");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Whiskey");
    expect(res.body.cocktails.length).toBe(2);
  });
});
