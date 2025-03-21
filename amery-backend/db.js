const {Pool} = require('pg');
require('dotenv').config();

let poolConfig;

// Check if DATABASE_URL is provided (used by Render)
if (process.env.DATABASE_URL) {
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Required for Render PostgreSQL
        },
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000, // Increased for cloud environment
    };
} else {
    // Local development configuration
    poolConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };
}

const pool = new Pool(poolConfig);

pool.on("error", (err) => {
    console.error("Unexpected database error:", err);
    // Don't exit process in production as it can cause container cycling
    if (process.env.NODE_ENV !== 'production') {
        process.exit(-1);
    }
});

module.exports = pool;