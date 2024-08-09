const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Restaurant Management API',
    version: '1.0.0',
    description: 'API documentation for Restaurant Management System',
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./index.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;