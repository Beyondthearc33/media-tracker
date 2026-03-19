const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Media Tracker API',
    description: 'Media tracker will allow users to create a backlog/watchlist of movies/shows they watch. They can track status, rate them, create notes and mark when watched.'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Media', description: 'Media management' },
    { name: 'Library', description: 'User media tracking' },
    { name: 'Collections', description: 'User collections' }
  ]
};

const outputFile = './src/swagger.json';

const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);