const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000

// initializing express
const app = express();

// enabling CORS middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})