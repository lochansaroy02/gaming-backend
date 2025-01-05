const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        console.log('Request Body:', req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully', data: user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createUser };