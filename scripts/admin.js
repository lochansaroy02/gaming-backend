const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminName = process.env.ADMIN_NAME;
    const admin = await User.findOne({ email: adminEmail });
    if (!admin) {
        const password = process.env.ADMIN_PASSWORD;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = await User.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });
        console.log(`Admin created successfully: ${newAdmin.name}`);
    } else {
        console.log('Admin already exists');
    }
}

module.exports = createAdmin;