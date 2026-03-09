const swaggerAutogen = require('swagger-autogen')();
const { writeFileSync, readFileSync } = require('fs');
const yaml = require('js-yaml');

const doc = {
  info: {
    title: 'API con Express',
    version: '1.0.0',
    description: 'Documentación de la API REST con Express y JWT.\n\nMódulo 4 - Diplomado Fullstack - Desarrollo de Backend\n\nNombre: Juan Pablo Guzmán'
  },
  host: 'localhost:3000',
  tags: [
    { name: 'Usuarios', description: 'Endpoints de gestión de usuarios' },
    { name: 'Auth', description: 'Endpoints de autenticación' },
    { name: 'Tareas', description: 'Endpoints de gestión de tareas' }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
};

const outputFileJson = './swagger_temp.json';
const outputFileYaml = './swaggerJPG.yaml';
const routes = ['./src/app.js'];

swaggerAutogen(outputFileJson, routes, doc).then(() => {
  const json = JSON.parse(readFileSync(outputFileJson, 'utf8'));
  writeFileSync(outputFileYaml, yaml.dump(json, { lineWidth: -1 }));
  console.log('✅ swaggerJPG.yaml generado correctamente');
});