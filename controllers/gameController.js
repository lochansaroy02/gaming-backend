const uploadFileToS3 = require('../config/s3');
const { v4: uuidv4 } = require('uuid');
const Game = require('../models/gameModel');

/**
 * Handles uploading a new game with its metadata and files.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const uploadGame = async (req, res) => {
    const {
        title,
        description,
        coreName,
        category,
        developer,
        embedScript,
        imageFileURL,
        platform,
        emulator,
        popularity,
        heading,
        content
    } = req.body;



    const gameFile = req.files?.file?.[0];
    const imageFile = req.files?.image?.[0];



    try {
        // Generate unique keys for the uploaded files
        const gameFileKey = `games/${uuidv4()}-${gameFile?.originalname}`;
        const imageFileKey = `images/${uuidv4()}-${imageFile?.originalname}`;

        // Upload files to S3
        const gameURL = await uploadFileToS3(gameFileKey, gameFile?.buffer, gameFile?.mimetype);
        const imageURL = await uploadFileToS3(imageFileKey, imageFile?.buffer, imageFile?.mimetype);

        // Save game details in MongoDB
        const newGame = await Game.create({
            title,
            description,
            coreName,
            gameURL,
            imageURL,
            imageFileURL,
            category,
            developer,
            embedScript,
            platform,
            emulator,
            popularity,
            heading,
            content
        });

        res.status(201).json({ message: 'Game uploaded successfully', game: newGame });
    } catch (error) {
        console.error('Error uploading game:', error.message);
        res.status(500).json({ message: 'Error uploading game. Please try again.' });
    }
};

/**
 * Retrieves all games stored in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getGames = async (req, res) => {
    try {
        const games = await Game.find(); // Fetch all games
        res.status(200).json(games);
    } catch (error) {
        console.error('Error retrieving games:', error.message);
        res.status(500).json({ message: 'Failed to fetch games. Please try again later.' });
    }
};

const deleteGame = async (req, res) => {
    const { id } = req.params;
    await Game.deleteOne({ _id: id });
    res.status(200).json({ message: 'Game deleted successfully' });
};

const updatePopularity = async (req, res) => {
    const { id } = req.params;
    const { popularity } = req.body;
    const newPopularity = popularity + 1;
    await Game.findByIdAndUpdate(id, { popularity: newPopularity }, { new: true });
    res.status(200).json({ message: 'Popularity updated successfully' });
};

const updateGame = async (req, res) => {
    const { id } = req.params;
    const { title, description, coreName, category, developer, embedScript, platform, gameURL, imageURL, imageFileURL, emulator, popularity, content } = req.body;

    const gameFile = req.files?.file?.[0];
    const imageFile = req.files?.image?.[0];

    try {

        const updateFields = { title, description, coreName, category, developer, embedScript, platform, gameURL, imageURL, imageFileURL, emulator, popularity, content };

        if (gameFile) {
            if (gameFile.buffer && gameFile.originalname) {
                const gameFileKey = `games/${uuidv4()}-${gameFile.originalname}`;
                const gameURL = await uploadFileToS3(gameFileKey, gameFile.buffer, gameFile.mimetype);
                updateFields.gameURL = gameURL;
                console.log("Game file uploaded successfully:", gameURL);
            } else {
                console.warn("Game file is invalid or missing required properties.");
            }
        }

        if (imageFile) {
            if (imageFile.buffer && imageFile.originalname) {
                const imageFileKey = `images/${uuidv4()}-${imageFile.originalname}`;
                const imageURL = await uploadFileToS3(imageFileKey, imageFile.buffer, imageFile.mimetype);
                updateFields.imageURL = imageURL;
                console.log("Image file uploaded successfully:", imageURL);
            } else {
                console.warn("Image file is invalid or missing required properties.");
            }
        }

        const updatedGame = await Game.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Game updated successfully', game: updatedGame });
    } catch (error) {
        console.error('Error updating game:', error.message);
        res.status(500).json({ message: 'Error updating game. Please try again.', error: error.message });
    }
};




module.exports = { uploadGame, getGames, deleteGame, updateGame, updatePopularity };