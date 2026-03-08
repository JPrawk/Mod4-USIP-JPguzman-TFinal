import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router.route('/list/pagination')
  .get(userController.getUsersPagination);

router.route('/:id')
  .get(authMiddleware, userController.getUserById)
  .put(authMiddleware, userController.updateUser)
  .patch(authMiddleware, userController.patchUser)
  .delete(authMiddleware, userController.deleteUser);

router.route('/:id/tasks')
  .get(userController.getUserWithTasks);

export default router;