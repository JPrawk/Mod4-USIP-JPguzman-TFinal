import { Router } from 'express';
import taskController from '../controllers/task.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(
    /*  #swagger.tags = ['Tareas']
        #swagger.summary = 'Obtener lista de tareas'
        #swagger.description = 'Obtiene las tareas del usuario autenticado. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.responses[200] = { description: "Lista de tareas" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
    */
    authMiddleware, taskController.getTasks
  )
  .post(
    /*  #swagger.tags = ['Tareas']
        #swagger.summary = 'Crear una nueva tarea'
        #swagger.description = 'Crea una tarea asociada al usuario autenticado. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Estudiar" }
                }
              }
            }
          }
        }
        #swagger.responses[201] = { description: "Tarea creada correctamente" }
        #swagger.responses[400] = { description: "Datos inválidos" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
    */
    authMiddleware, taskController.createTask
  );

router.route('/:id')
  .get(
    /*  #swagger.tags = ['Tareas']
        #swagger.summary = 'Obtener tarea por ID'
        #swagger.description = 'Devuelve una tarea específica. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.responses[200] = { description: "Información de la tarea" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Tarea no encontrada" }
    */
    authMiddleware, taskController.getTaskById
  )
  .put(
    /*  #swagger.tags = ['Tareas']
        #swagger.summary = 'Actualizar tarea por ID'
        #swagger.description = 'Actualiza completamente una tarea existente. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Trabajar" }
                }
              }
            }
          }
        }
        #swagger.responses[200] = { description: "Tarea actualizada correctamente" }
        #swagger.responses[400] = { description: "Datos inválidos" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Tarea no encontrada" }
    */
    authMiddleware, taskController.updateTask
  )
  .patch(
    /*  #swagger.tags = ['Tareas']
        #swagger.summary = 'Actualizar parcialmente tarea por ID'
        #swagger.description = 'Marca una tarea como done. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["done"],
                properties: {
                  done: { type: "boolean", example: true }
                }
              }
            }
          }
        }
        #swagger.responses[200] = { description: "Tarea actualizada parcialmente" }
        #swagger.responses[400] = { description: "Datos inválidos" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Tarea no encontrada" }
    */
    authMiddleware, taskController.patchTask
  )
  .delete(
    /*  #swagger.tags = ['Tareas']
        #swagger.summary = 'Eliminar tarea por ID'
        #swagger.description = 'Elimina una tarea existente. Requiere token Bearer.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.responses[204] = { description: "Tarea eliminada correctamente" }
        #swagger.responses[401] = { description: "Token no proporcionado o inválido" }
        #swagger.responses[404] = { description: "Tarea no encontrada" }
    */
    authMiddleware, taskController.deleteTask
  );

export default router;