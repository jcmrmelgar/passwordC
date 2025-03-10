/**
 * Password Service - Core functionality for generating secure passwords
 */

/**
 * Generate a specified number of passwords based on criteria
 * 
 * @param {Object} options Password generation options
 * @param {number} options.length Minimum password length (default: 8)
 * @param {boolean} options.uppercase Include uppercase letters (default: true)
 * @param {boolean} options.lowercase Include lowercase letters (default: true)
 * @param {boolean} options.numbers Include numbers (default: true)
 * @param {boolean} options.special Include special characters (default: true)
 * @param {number} options.count Number of passwords to generate (default: 1)
 * @returns {Array} Array of generated passwords
 */
exports.generatePasswords = (options) => {
  try {
    // Set default options
    const config = {
      length: options.length || 8,
      uppercase: options.uppercase !== undefined ? options.uppercase : true,
      lowercase: options.lowercase !== undefined ? options.lowercase : true,
      numbers: options.numbers !== undefined ? options.numbers : true,
      special: options.special !== undefined ? options.special : true,
      count: options.count || 1
    };

    // Validate input
    if (config.length < 4) {
      throw new Error('Password length must be at least 4 characters');
    }
    
    if (config.count < 1) {
      throw new Error('Must generate at least 1 password');
    }
    
    if (!config.uppercase && !config.lowercase && !config.numbers && !config.special) {
      throw new Error('At least one character type must be selected');
    }

    // Generate the requested number of passwords
    const passwords = [];
    for (let i = 0; i < config.count; i++) {
      passwords.push(generateSinglePassword(config));
    }
    
    return passwords;
  } catch (error) {
    throw error;
  }
};

/**
 * Generate a single password based on criteria
 * 
 * @param {Object} config Password generation configuration
 * @returns {string} A generated password
 */
function generateSinglePassword(config) {
  // Character sets
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };
  
  // Create pool of allowed characters
  let charPool = '';
  if (config.uppercase) charPool += charSets.uppercase;
  if (config.lowercase) charPool += charSets.lowercase;
  if (config.numbers) charPool += charSets.numbers;
  if (config.special) charPool += charSets.special;
  
  // Ensure at least one character from each selected type
  let password = '';
  if (config.uppercase) password += getRandomChar(charSets.uppercase);
  if (config.lowercase) password += getRandomChar(charSets.lowercase);
  if (config.numbers) password += getRandomChar(charSets.numbers);
  if (config.special) password += getRandomChar(charSets.special);
  
  // Fill the rest of the password
  while (password.length < config.length) {
    password += getRandomChar(charPool);
  }
  
  // Shuffle the password characters for randomness
  return shuffleString(password);
}

/**
 * Get a random character from a string
 * 
 * @param {string} charSet String of characters to choose from
 * @returns {string} A single random character
 */
function getRandomChar(charSet) {
  return charSet.charAt(Math.floor(Math.random() * charSet.length));
}

/**
 * Shuffle a string's characters (Fisher-Yates algorithm)
 * 
 * @param {string} str String to shuffle
 * @returns {string} Shuffled string
 */
function shuffleString(str) {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array.join('');
}
