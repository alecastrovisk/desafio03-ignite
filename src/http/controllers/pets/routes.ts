import { FastifyInstance } from 'fastify'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets/:orgID', register)
}
