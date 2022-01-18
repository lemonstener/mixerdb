const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

const client = new Client({
  connectionString: getDatabaseUri(),
});

module.exports = client;
