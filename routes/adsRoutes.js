const express = require('express');
const router = express.Router();
const { createSpace, updateSpace, getSpace, deleteSpace } = require('../controllers/AdsController');

router.post('/spacing', createSpace);
router.get('/get-space', getSpace);
router.put('/spacing/:id', updateSpace);
router.delete('/spacing/:id', deleteSpace);

module.exports = router;
