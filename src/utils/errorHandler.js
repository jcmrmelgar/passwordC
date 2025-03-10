/**
 * Error Handler Utility
 */

/**
 * Handle errors and send appropriate responses
 * 
 * @param {Error} error The error object
 * @param {Object} res The response object
 */
exports.handleError = (error, res) => {
  console.error('Error:', error.message);
  
  // Determine if this is a validation error or server error
  const statusCode = error.name === 'ValidationError' ? 400 : 500;
  const errorType = statusCode === 400 ? 'Invalid Input' : 'Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: {
      type: errorType,
      message: error.message
    }
  });
};
