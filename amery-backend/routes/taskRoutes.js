const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/authMiddleware');
const { verify } = require('jsonwebtoken');


// creating a task
router.post('/', verifyToken, async (req, res) => {
    try {
        const {message} = req.body;
        if (!message || message.length < 3) {
            return res.status(400).json({
                message: "Task needs to be longer than a word!"
            })
        }
        const userId = req.user.userId;

        const newTask = await pool.query(
            'INSERT INTO tasks (user_id, message) VALUES ($1, $2) RETURNING *',
            [userId, message]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "Error creating task, check taskRoutes.js"
        });
    }
} );

// retrieving tasks for the user
router.get('/', verifyToken, async (req,res) => {
    try {
        const userId = req.user.userId;
        const tasks = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at_time DESC',
            [userId]
        );
        res.json(tasks.rows);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving tasks for user."
        });
    }
});

// update task
router.put('/:id', verifyToken, async (req, res) => {
    try {
        
        const {id} = req.params;
        const {message, completed} =req.body;
        const userId = req.user.userId;

        const updatedTask = await pool.query(
            'UPDATE tasks SET message = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING * ',
            [message, completed, id, userId]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).json({
                message: "task not found"
            })
        };
        res.json(updatedTask.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: "Error updating task."
        })
    }
});


// delete task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user.userId;

        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task is not found."
            })
        };
        res.status(200).json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting task"
        });
    }
})

module.exports = router;