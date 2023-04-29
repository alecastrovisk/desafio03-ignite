import { FastifyInstance } from 'fastify'

import { RegisterOrgsController } from './register'
import { AuthenticateController } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', RegisterOrgsController)

  app.post('/auth', AuthenticateController)
}
