const express = require('express');
const router = express.Router();
const {login, registerUser} = require("../routes/auth");

router.post("/login", login);
router.post("/signup", registerUser);

module.exports = router;