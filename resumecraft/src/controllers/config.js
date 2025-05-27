const configService = require('../services/config');

class ConfigController {
  // PUBLIC_INTERFACE
  get(req, res) {
    /** Get config for the frontend (theme, colors, etc) */
    const config = configService.getConfig();
    res.json(config);
  }
}

module.exports = new ConfigController();
