import express from 'express';
import morgan from 'morgan';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import usersRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js';

const app = express();

// Cargar swaggerJPG.yaml
const swaggerDocument = load(readFileSync('./swaggerJPG.yaml', 'utf8'));

// Middlewares
app.use(express.json());
app.use(morgan('combined'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;