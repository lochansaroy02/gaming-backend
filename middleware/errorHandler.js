const errorHandler = (err, req, res, next) => {
    // Determine the status code
    const statusCode = res.statusCode === 200 ? (err.statusCode || 500) : res.statusCode;

    res.status(statusCode).json({
        success: false, // Indicate failure
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        details: err.details || null, // Include additional error details if available
    });
};

module.exports = errorHandler;
