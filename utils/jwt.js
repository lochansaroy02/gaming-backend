const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');


const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

module.exports = { generateToken };