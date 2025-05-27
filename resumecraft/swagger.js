const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ResumeCraft API',
      version: '1.0.0',
      description: 'API documentation for ResumeCraft backend. Features endpoints for template discovery, document generation, grammar checking, and PDF exporting.',
      contact: {
        name: 'ResumeCraft Team',
        email: 'support@resumecraft.local'
      }
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
