const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'No token was delivered.'});
    }
    const token = authHeader.split(' ')[1]; // extract token from header detail
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Invalid or expired token.'});
        }
        req.user = decoded;
        next();
    });
};



module.exports = verifyToken;