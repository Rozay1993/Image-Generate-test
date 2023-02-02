const fs = require("fs");
const mysql = require("mysql2");
// mysql.defaults.ssl === true;
var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "mysql2",
    useNullAsDefault: true,
    connection: {
      host: process.env.MYSQL_DEV_HOST,
      port: process.env.MYSQL_DEV_PORT,
      user: process.env.MYSQL_DEV_USER,
      password: process.env.MYSQL_DEV_PASSWORD,
      database: process.env.MYSQL_DEV_DATABASE,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + process.env.CRT_PATH),
      // },
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "mysql",
    useNullAsDefault: true,

    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
