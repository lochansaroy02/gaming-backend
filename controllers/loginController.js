const loginService = require('../auth/login');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginService(email, password);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    loginController,
};