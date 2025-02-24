const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/authMiddleware');


// creating a task
router.post('/', verifyToken, async (req, res) => {
    try {
        const {message} = req.body;
        const userId = req.user.userId;
        const newTask = await pool.query(
            'INSERT INTO tasks (user_id, message) VALUES ($1, $2) RETURNING *',
            [userId, message]
        );
        
    }
} )