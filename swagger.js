import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API con Express',
    description: 'Documentación generada automáticamente'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger.yaml';
const routes = ['./src/app.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);