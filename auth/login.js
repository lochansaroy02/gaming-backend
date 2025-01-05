const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

const loginService = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('user not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = generateToken(user);
    const data = {
        token: token,
        user: user
    }
    return data;
};

module.exports = loginService;