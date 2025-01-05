const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Initialize S3 client with credentials from the .env file
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Uploads a file to S3 and returns the public URL after renaming the file (removing spaces).
 *
 * @param {string} fileKey - The unique key to be used for the file in S3 (e.g., 'games/game.nes').
 * @param {Buffer} fileBuffer - The file content as a buffer.
 * @param {string} contentType - The MIME type of the file (e.g., 'application/octet-stream').
 * @returns {Promise<string>} - The public URL of the uploaded file.
 */
const uploadFileToS3 = async (fileKey, fileBuffer, contentType) => {
    // Remove spaces from the filename by replacing them with underscores
    const sanitizedFileKey = fileKey.replace(/\s+/g, '_');  // Replace spaces with underscores

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,  // Your S3 bucket name
        Key: sanitizedFileKey,  // The sanitized file name
        Body: fileBuffer,  // File content as a buffer
        ContentType: contentType,  // File MIME type
        ACL: 'public-read',  // Make the file publicly readable
    };

    try {
        console.log(`Uploading file: ${sanitizedFileKey} to bucket: ${process.env.AWS_BUCKET_NAME}`);
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Return the public URL of the file
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${sanitizedFileKey}`;
    } catch (error) {
        console.error(`Error uploading file "${sanitizedFileKey}" to S3:`, error.message);
        throw new Error('File upload failed. Please try again.');
    }
};

module.exports = uploadFileToS3;
