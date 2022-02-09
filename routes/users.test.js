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

describe("/users/register", () => {
  test("registering a user", async () => {
    const res = await request(app).post("/users/register").send({
      username: "test3",
      email: "test3@email.com",
      password: "password3",
    });
    expect(res.statusCode).toBe(201);
  });
  test("json schema validation - username too short", async () => {
    const res = await request(app).post("/users/register").send({
      username: "t",
      email: "test3@email.com",
      password: "password3",
    });
    expect(res.statusCode).toBe(400);
  });
  test("json schema validation - password too short", async () => {
    const res = await request(app).post("/users/register").send({
      username: "test3",
      email: "test3@email.com",
      password: "p3",
    });
    expect(res.statusCode).toBe(400);
  });
  test("json schema validation - invalid email format", async () => {
    const res = await request(app).post("/users/register").send({
      username: "test3",
      email: "blah blah blah",
      password: "p3",
    });
    expect(res.statusCode).toBe(400);
  });
  test("username must be unique", async () => {
    const res = await request(app).post("/users/register").send({
      username: "test1",
      email: "test3@email.com",
      password: "password1",
    });
    expect(res.statusCode).toBe(400);
  });
  test("email must be unique", async () => {
    const res = await request(app).post("/users/register").send({
      username: "test3",
      email: "test1@email.com",
      password: "password1",
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("/users/login", () => {
  test("loging in", async () => {
    const res = await request(app).post("/users/login").send({
      username: "test1",
      password: "password1",
    });
    expect(res.statusCode).toBe(201);
  });
  test("loging in", async () => {
    const res = await request(app).post("/users/login").send({
      username: "test1",
      password: "password20",
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("/users/:name", () => {
  test("get user information", async () => {
    const res = await request(app).get("/users/test1");
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("test1");
    expect(res.body.favorites.length).toBe(1);
  });
});
