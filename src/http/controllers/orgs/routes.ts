import { FastifyInstance } from 'fastify'
import { RegisterOrgsController } from './register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', RegisterOrgsController)
}
