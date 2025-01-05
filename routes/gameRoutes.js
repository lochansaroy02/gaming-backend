const express = require('express');
const multer = require('multer');
const { uploadGame, getGames, deleteGame, updateGame, updatePopularity } = require('../controllers/gameController');

const router = express.Router();
const upload = multer(); // Initialize Multer for handling file uploads

/**
 * @route POST /api/games/upload
 * @desc Upload a game file and its associated image
 * @access Admin
 */
router.post(
    '/upload',
    upload.fields([
        { name: 'file', maxCount: 1 },
        { name: 'image', maxCount: 1 },
    ]),
    uploadGame
);

/**
 * @route GET /api/games
 * @desc Retrieve all uploaded games
 * @access Public
 */
router.get('/get', getGames);

/**
 * @route DELETE /api/games/:id
 * @desc Delete a game by ID
 * @access Admin
 */
router.delete('/:id', deleteGame);


/**
 * @route PUT /api/games/:id
 * @desc Update a game by ID
 * @access Admin
 */
router.put('/:id',
    upload.fields([
        { name: 'file', maxCount: 1 },
        { name: 'image', maxCount: 1 },
    ]),
    updateGame
);

/**
 * @route PUT /api/games/:id/popularity
 * @desc Update a game's popularity by ID
 * @access Public
 */
router.put('/:id/popularity', updatePopularity);

module.exports = router;