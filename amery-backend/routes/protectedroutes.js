const express = require('express');
const {login, registerUser} = require('./auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', registerUser);         

module.exports = router;