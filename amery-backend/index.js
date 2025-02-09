const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pool = require('./db');
const port = process.env.PORT || 5000

// route implementation
const protectedRoutes = require('./routes/protectedroutes');

// initializing express
const app = express();

// enabling CORS middleware
app.use(cors());
app.use(express.json());

app.use('/auth', protectedRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


// testing for connection
app.get("/test-db", async (req, res) => {
    console.log("Attempting to connect to the database...");
    try {
        const result = await pool.query("SELECT NOW();");
        console.log("Database connected successfully:", result.rows[0]);
        res.json({ message: "Connected to PSQL", time: result.rows[0].now });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})