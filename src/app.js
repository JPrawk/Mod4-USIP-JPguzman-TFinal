import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('combined'));

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