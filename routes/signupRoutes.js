const express = require('express');
const { createUser } = require('../auth/signup');

const router = express.Router();

router.post('/signup', createUser);

module.exports = router;