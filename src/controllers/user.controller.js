let users = [
  { id: 1, username: 'ctrigo', password: '123', status: 'active', tasks: [] },
  { id: 2, username: 'jperez', password: '123', status: 'inactive', tasks: [] },
  { id: 3, username: 'agarcia', password: '123', status: 'active', tasks: [] },
  { id: 4, username: 'mrojas', password: '123', status: 'active', tasks: [] },
  { id: 5, username: 'llopez', password: '123', status: 'inactive', tasks: [] }
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

    // Validar que orderBy sea un campo permitido
    const allowedOrderBy = ['id', 'username', 'status'];
    const safeOrderBy = allowedOrderBy.includes(orderBy) ? orderBy : 'id';

    let filtered = users;

    // Búsqueda por username (ILIKE)
    if (search) {
      filtered = filtered.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por status
    if (status) {
      filtered = filtered.filter(u => u.status === status);
    }

    // Ordenamiento dinámico
    filtered.sort((a, b) => {
      let valA = a[safeOrderBy];
      let valB = b[safeOrderBy];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (orderDir.toUpperCase() === 'ASC') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    // Paginación
    const total = filtered.length;
    const pages = Math.ceil(total / parseInt(limit));
    const start = (parseInt(page) - 1) * parseInt(limit);
    const data = filtered.slice(start, start + parseInt(limit))
      .map(({ password, tasks, ...u }) => u);

    res.status(200).json({ total, page: parseInt(page), pages, data });
  },

  // POST /api/users
  createUser: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
      status: 'active',
      tasks: []
    };

    users.push(newUser);
    const { password: _, tasks: __, ...response } = newUser;
    res.status(201).json(response);
  },

  // GET /api/users/:id
  getUserById: (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { password, tasks, ...response } = user;
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

    users[index] = { ...users[index], username, password };
    res.status(200).json([1]);
  },

  // PATCH /api/users/:id
  patchUser: (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status es requerido' });

    users[index] = { ...users[index], status };
    const { password, tasks, ...response } = users[index];
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

    res.status(200).json({ username: user.username, tasks: user.tasks });
  }
};