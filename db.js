const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let client;

if (process.env.NODE_ENV === "production") {
  client = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  client = new Client({
    connectionString: getDatabaseUri(),
  });
}

module.exports = client;
