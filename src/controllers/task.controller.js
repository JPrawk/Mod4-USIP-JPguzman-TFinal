let tasks = [
  { id: 1, name: 'Tarea 1', done: false, userId: 1 },
  { id: 2, name: 'Tarea 2', done: false, userId: 1 },
  { id: 3, name: 'Tarea 3', done: true, userId: 2 },
  { id: 4, name: 'Tarea 4', done: false, userId: 3 },
  { id: 5, name: 'Tarea 5', done: true, userId: 4 }
];

export default {

  // GET /api/tasks
  getTasks: (req, res) => {
    const userTasks = tasks.filter(t => t.userId === req.user.id);
    res.status(200).json({ total: userTasks.length, data: userTasks });
  },

  // POST /api/tasks
  createTask: (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre de la tarea es requerido' });
    }

    const newTask = {
      id: tasks.length + 1,
      name,
      done: false,
      userId: req.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  },

  // GET /api/tasks/:id
  getTaskById: (req, res) => {
    const task = tasks.find(t => 
      t.id === parseInt(req.params.id) && t.userId === req.user.id
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json({ name: task.name, done: task.done });
  },

  // PUT /api/tasks/:id
  updateTask: (req, res) => {
    const index = tasks.findIndex(t => 
      t.id === parseInt(req.params.id) && t.userId === req.user.id
    );
    if (index === -1) return res.status(404).json({ message: 'Tarea no encontrada' });

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'El nombre es requerido' });

    tasks[index] = { ...tasks[index], name, updatedAt: new Date().toISOString() };
    res.status(200).json([1]);
  },

  // PATCH /api/tasks/:id
  patchTask: (req, res) => {
    const index = tasks.findIndex(t => 
      t.id === parseInt(req.params.id) && t.userId === req.user.id
    );
    if (index === -1) return res.status(404).json({ message: 'Tarea no encontrada' });

    const { done } = req.body;
    if (done === undefined) return res.status(400).json({ message: 'El campo done es requerido' });

    tasks[index] = { ...tasks[index], done, updatedAt: new Date().toISOString() };
    res.status(200).json([1]);
  },

  // DELETE /api/tasks/:id
  deleteTask: (req, res) => {
    const index = tasks.findIndex(t => 
      t.id === parseInt(req.params.id) && t.userId === req.user.id
    );
    if (index === -1) return res.status(404).json({ message: 'Tarea no encontrada' });

    tasks.splice(index, 1);
    res.status(204).send();
  }
};