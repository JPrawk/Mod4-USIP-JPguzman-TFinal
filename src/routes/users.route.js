import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtener lista de usuarios'
        #swagger.description = 'Obtiene la lista completa de usuarios.'
        #swagger.responses[200] = { description: "Lista de usuarios" }
    */
    userController.getUsers
  )
  .post(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Crear un nuevo usuario'
        #swagger.description = 'Crea un usuario con username y password.'
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["username", "password"],
                properties: {
                  username: { type: "string", example: "user" },
                  password: { type: "string", example: "123" }
                }
              }
            }
          }
        }
        #swagger.responses[201] = { description: "Usuario creado correctamente" }
        #swagger.responses[400] = { description: "Datos inválidos" }
    */
    userController.createUser
  );

router.route('/list/pagination')
  .get(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtener lista de usuarios con paginación'
        #swagger.description = 'Obtiene la lista de usuarios con filtros opcionales y paginación.'
        #swagger.parameters['page'] = { in: 'query', description: 'Número de página', schema: { type: 'integer', default: 1 } }
        #swagger.parameters['limit'] = { in: 'query', description: 'Cantidad de registros', schema: { type: 'integer', default: 10, enum: [5, 10, 15, 20] } }
        #swagger.parameters['search'] = { in: 'query', description: 'Búsqueda por username (ILIKE)', schema: { type: 'string' } }
        #swagger.parameters['orderBy'] = { in: 'query', description: 'Campo por ordenar', schema: { type: 'string', default: 'id', enum: ['id', 'username', 'status'] } }
        #swagger.parameters['orderDir'] = { in: 'query', description: 'Dirección del ordenamiento', schema: { type: 'string', default: 'DESC', enum: ['ASC', 'DESC'] } }
        #swagger.parameters['status'] = { in: 'query', description: 'Filtrar por estado', schema: { type: 'string', enum: ['active', 'inactive'] } }
        #swagger.responses[200] = { description: "Lista paginada de usuarios" }
    */
    userController.getUsersPagination
  );

router.route('/:id')
  .get(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtener usuario por ID'
        #swagger.description = 'Devuelve la información de un usuario específico. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.responses[200] = { description: "Información del usuario" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Usuario no encontrado" }
    */
    authMiddleware, userController.getUserById
  )
  .put(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Actualizar usuario por ID'
        #swagger.description = 'Actualiza completamente un usuario existente. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["username", "password"],
                properties: {
                  username: { type: "string", example: "ctrigo" },
                  password: { type: "string", example: "123" }
                }
              }
            }
          }
        }
        #swagger.responses[200] = { description: "Usuario actualizado correctamente" }
        #swagger.responses[400] = { description: "Datos inválidos" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Usuario no encontrado" }
    */
    authMiddleware, userController.updateUser
  )
  .patch(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Actualizar parcialmente usuario por ID'
        #swagger.description = 'Actualiza el status de un usuario. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: { type: "string", enum: ["active", "inactive"], example: "active" }
                }
              }
            }
          }
        }
        #swagger.responses[200] = { description: "Usuario actualizado parcialmente" }
        #swagger.responses[400] = { description: "Datos inválidos" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Usuario no encontrado" }
    */
    authMiddleware, userController.patchUser
  )
  .delete(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Eliminar usuario por ID'
        #swagger.description = 'Elimina un usuario existente. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.responses[204] = { description: "Usuario eliminado correctamente" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Usuario no encontrado" }
    */
    authMiddleware, userController.deleteUser
  );

router.route('/:id/tasks')
  .get(
    /*  #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtener usuario con sus tareas'
        #swagger.description = 'Obtiene un usuario con la lista de sus tareas asociadas.'
        #swagger.responses[200] = { description: "Usuario con sus tareas" }
        #swagger.responses[404] = { description: "Usuario no encontrado" }
    */
    userController.getUserWithTasks
  );

export default router;