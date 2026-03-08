import pino from 'pino';
export default pino({
transport: {
target: 'pino-pretty',
options: { translateTime: 'SYS:dd/mm/yyyy HH:mm:ss' }
}
});