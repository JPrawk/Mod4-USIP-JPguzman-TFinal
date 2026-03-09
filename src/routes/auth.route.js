import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const router = Router();

router.route('/login')
  .post(
    /*  #swagger.tags = ['Auth']
        #swagger.summary = 'Login de usuario'
        #swagger.description = 'Autentica un usuario y devuelve un token JWT.'
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
        #swagger.responses[200] = { description: "Login exitoso, devuelve token JWT" }
        #swagger.responses[400] = { description: "Datos inválidos" }
        #swagger.responses[401] = { description: "Credenciales inválidas" }
    */
    authController.login
  );

export default router;