const {Pool} = require('pg');
require('dotenv').config();


// using env variables for storing credentials safely and effectively
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

pool.on("error", (err) => {
    console.error("unexpected error:", err);
    process.exit(-1);
})

module.exports = pool;