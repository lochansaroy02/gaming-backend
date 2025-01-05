const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
        req.user = user;
        next();
    });
}


module.exports = { authenticateToken };