
// handle login, registration, and signout

const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// auth functions
const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        // does user exist?
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // does password match the hashed one?
        const doesMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!doesMatch) {
            return res.status(401).json({ message: 'Invalid credentails' });
        }

        // if logged in, let's add a token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        // send back token to frontend
        res.status(200).json({ token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });

    }

};




const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
    // password hashing
    const hashed_password = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
        'INSERT INTO users (firstname, lastname, username, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id, username',
        [firstname, lastname, username, email, hashed_password]
    );

    
    res.status(201).json({ message: 'User registered!', user: newUser.rows[0] });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({message: "Internal server error"});
    }
    
};

module.exports = { login, registerUser };    