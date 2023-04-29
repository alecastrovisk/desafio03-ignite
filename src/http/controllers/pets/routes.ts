import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets', { onRequest: [verifyJWT] }, () => console.log('Teste'))
}
