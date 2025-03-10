/**
 * Default Configuration
 */

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  
  // Password generation limits
  passwords: {
    minLength: 4,
    maxLength: 100,
    maxCount: 100 // Maximum number of passwords that can be generated at once
  }
};
