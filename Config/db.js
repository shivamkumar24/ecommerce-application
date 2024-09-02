const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "ShivamKumar",
  host: 3000,
  database: "ecommerce_db",
  password: "shivamkumar",
  port: 5432,
});

module.exports = pool;
