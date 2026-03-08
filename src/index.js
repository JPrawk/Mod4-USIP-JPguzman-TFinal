import app from './app.js';
import env from './config/env.js';
import logger from './logs/logger.js';

app.listen(env.port, () => {
logger.info("Servidor activo en puerto " + env.port);
logger.info("Documentacion en http://localhost:" + env.port + "/api-docs");
});