/**
 * Password Controller - Handles password generation requests
 */

const passwordService = require('../services/passwordService');
const { handleError } = require('../utils/errorHandler');

/**
 * Generate passwords based on specified criteria
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
exports.generatePassword = (req, res) => {
  try {
    const options = {
      length: parseInt(req.body.length) || 8,
      uppercase: req.body.uppercase === 'true',
      lowercase: req.body.lowercase === 'true',
      numbers: req.body.numbers === 'true',
      special: req.body.special === 'true',
      count: parseInt(req.body.count) || 1
    };

    const passwords = passwordService.generatePasswords(options);
    
    res.status(200).json({
      success: true,
      count: passwords.length,
      passwords: passwords
    });
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Get password generation options (for UI)
 * 
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
exports.getOptions = (req, res) => {
  try {
    // Return the available options for password generation
    res.status(200).json({
      success: true,
      options: {
        minLength: 4,
        maxLength: 100,
        defaultLength: 8,
        defaultCount: 1,
        charTypes: [
          { name: 'uppercase', label: 'Uppercase Letters (A-Z)', default: true },
          { name: 'lowercase', label: 'Lowercase Letters (a-z)', default: true },
          { name: 'numbers', label: 'Numbers (0-9)', default: true },
          { name: 'special', label: 'Special Characters (\!@#$%^&*)', default: true }
        ]
      }
    });
  } catch (error) {
    handleError(error, res);
  }
};
