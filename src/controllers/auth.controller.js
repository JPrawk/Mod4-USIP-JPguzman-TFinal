import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { users } from './user.controller.js';

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username y password son requeridos' });
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    env.jwtSecret,
    { expiresIn: '24h' }
  );

  res.status(200).json({ token });
};

export default { login };