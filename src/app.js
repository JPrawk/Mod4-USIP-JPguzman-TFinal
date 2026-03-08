import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import userRoutes from './routes/users.route.js';

const app = express();
const swaggerDoc = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));

app.use(express.json());
app.use(morgan('combined'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/users', userRoutes);

export default app;