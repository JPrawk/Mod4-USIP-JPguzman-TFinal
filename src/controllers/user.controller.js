import { tasks } from './task.controller.js';

export let users = [
  { id: 1, username: 'ctrigo', password: '123', status: 'active' },
  { id: 2, username: 'jperez', password: '123', status: 'inactive' },
  { id: 3, username: 'agarcia', password: '123', status: 'active' },
  { id: 4, username: 'mrojas', password: '123', status: 'active' },
  { id: 5, username: 'llopez', password: '123', status: 'inactive' }
];

export default {

  // GET /api/users
  getUsers: (req, res) => {
    const data = users.map(({ password, ...u }) => u);
    res.status(200).json({ total: data.length, data });
  },

  // GET /api/users/list/pagination
  getUsersPagination: (req, res) => {
    const {
      page = 1,
      limit = 10,
      search = '',
      orderBy = 'id',
      orderDir = 'DESC',
      status
    } = req.query;

    const allowedLimits = [5, 10, 15, 20];
    const safeLimit = allowedLimits.includes(parseInt(limit)) ? parseInt(limit) : 10;

    const allowedOrderBy = ['id', 'username', 'status'];
    const safeOrderBy = allowedOrderBy.includes(orderBy) ? orderBy : 'id';

    const safeOrderDir = ['ASC', 'DESC'].includes(orderDir.toUpperCase())
      ? orderDir.toUpperCase()
      : 'DESC';

    let filtered = [...users];

    if (search) {
      filtered = filtered.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter(u => u.status === status);
    }

    filtered.sort((a, b) => {
      let valA = a[safeOrderBy];
      let valB = b[safeOrderBy];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (safeOrderDir === 'ASC') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    const total = filtered.length;
    const pages = Math.ceil(total / safeLimit);
    const start = (parseInt(page) - 1) * safeLimit;
    const data = filtered
      .slice(start, start + safeLimit)
      .map(({ password, ...u }) => u);

    res.status(200).json({ total, page: parseInt(page), pages, data });
  },

  // POST /api/users
  createUser: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }

    const exists = users.find(u => u.username === username);
    if (exists) {
      return res.status(400).json({ message: 'El username ya está en uso' });
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    const { password: _, ...response } = newUser;
    res.status(201).json(response);
  },

  // GET /api/users/:id
  getUserById: (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { password, ...response } = user;
    res.status(200).json(response);
  },

  // PUT /api/users/:id
  updateUser: (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }

    users[index] = {
      ...users[index],
      username,
      password,
      updatedAt: new Date().toISOString()
    };
    res.status(200).json([1]);
  },

  // PATCH /api/users/:id
  patchUser: (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status es requerido' });

    const allowedStatus = ['active', 'inactive'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Status debe ser active o inactive' });
    }

    users[index] = {
      ...users[index],
      status,
      updatedAt: new Date().toISOString()
    };
    const { password, ...response } = users[index];
    res.status(200).json(response);
  },

  // DELETE /api/users/:id
  deleteUser: (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

    users.splice(index, 1);
    res.status(204).send();
  },

  // GET /api/users/:id/tasks
  getUserWithTasks: (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const userTasks = tasks
      .filter(t => t.userId === user.id)
      .map(({ id, userId, createdAt, updatedAt, ...t }) => t);

    res.status(200).json({ username: user.username, tasks: userTasks });
  }
};