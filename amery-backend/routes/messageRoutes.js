const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/authMiddleware");

let processUserInput;
try {
  const aiImplementation = require("../services/aiImplementation");
  processUserInput = aiImplementation.processUserInput;
} catch (error) {
  console.error("Error loading AI implementation:", error.message);
  // Provide a fallback implementation
   processUserInput = async (content) => {
    return {
      rawResponse:
        "AI service is currently unavailable. Please try again later.",
      tasks: [],
    };
  };
}

// retrieve the conversations
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const messages = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at_time ASC",
      [userId]
    );
    res.json(messages.rows);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({
      message:
        "Error retrieving messages with 500 status, check messagesRoutes.js",
    });
  }
});

// sending message to AI **** IMPORTANT vvvv
router.post("/", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({
        message: "Message can't be empty",
      });
    }

    // save the message
    const userMessage = await pool.query(
      "INSERT INTO messages (user_id, content, is_from_user) VALUES ($1, $2, $3) RETURNING *",
      [userId, content, true]
    );

    const aiResult = await processUserInput(content);

    // save AI response
    const aiMessage = await pool.query(
      "INSERT INTO messages (user_id, content, is_from_user) VALUES ($1, $2, $3) RETURNING *",
      [userId, aiResult.rawResponse, false]
    );

    const createdTasks = [];
    if (aiResult.tasks && aiResult.tasks.length > 0) {
      for (const taskContent of aiResult.tasks) {
        const taskResult = await pool.query(
          "INSERT INTO tasks (user_id, message, completed) VALUES ($1, $2, $3) RETURNING *",
          [userId, taskContent, false]
        );
        createdTasks.push(taskResult.rows[0]);
      }
    }

    res.status(201).json({
      userMessage: userMessage.rows[0],
      aiMessage: aiMessage.rows[0],
      createdTasks,
    });
  } catch (error) {
    console.error("Error sending message: ", error);
    res.status(500).json({
      message: "Error sending message to the AI model, check messageRoutes.js",
    });
  }
});

module.exports = router;
