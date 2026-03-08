import jwt from 'jsonwebtoken';
import env from '../config/env.js';

// Simulando usuarios en memoria (misma lista que user.controller.js)
const users = [
  { id: 1, username: 'ctrigo', password: '123', status: 'active' },
  { id: 2, username: 'jperez', password: '123', status: 'inactive' },
  { id: 3, username: 'agarcia', password: '123', status: 'active' },
  { id: 4, username: 'mrojas', password: '123', status: 'active' },
  { id: 5, username: 'llopez', password: '123', status: 'inactive' }
];

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