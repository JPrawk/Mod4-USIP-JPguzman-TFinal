import 'dotenv/config'

const env = {
  port: process.env.PORT || '3000',
  jwtSecret: process.env.JWT_SECRET || 'secret_key',
  nodeEnv: process.env.NODE_ENV || 'development'
}

export default env
