'use strict';

/**
 * Service for serving frontend configuration such as theme and color palette.
 */
class ConfigService {
  // PUBLIC_INTERFACE
  getConfig() {
    /** Returns backend-exposed theme and color palette settings */
    return {
      theme: 'dark',
      colors: {
        primary: '#6C3FC5',
        secondary: '#1A1A1A',
        accent: '#B39DDB'
      }
    };
  }
}

module.exports = new ConfigService();
