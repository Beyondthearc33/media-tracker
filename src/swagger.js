const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '',
    title: 'Media Tracker API',
    description: 'Media tracker will allow users to create a backlog/watchlist of movies/shows they watch. They can track status, rate them, create notes and mark when watched.'         // by default: ''
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [                  
    {
      name: 'Auth',            
      description: 'Authentication endpoints'       
    },
    {
        name: 'Media',
        description: 'Media management'
    },
    {
        name: 'Library',
        description: 'User media tracking'
    },
    {
        name: 'Collections',
        description: 'User collections'
    }
  ]
};

const outputFile = './src/swagger.json';
const routes = ['./src/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);