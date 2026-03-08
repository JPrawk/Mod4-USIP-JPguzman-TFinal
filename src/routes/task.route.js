import { Router } from 'express';
import taskController from '../controllers/task.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(authMiddleware, taskController.getTasks)
  .post(authMiddleware, taskController.createTask);

router.route('/:id')
  .get(authMiddleware, taskController.getTaskById)
  .put(authMiddleware, taskController.updateTask)
  .patch(authMiddleware, taskController.patchTask)
  .delete(authMiddleware, taskController.deleteTask);

export default router;