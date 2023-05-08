import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import multer from 'fastify-multer'

import { ZodError } from 'zod'
import { env } from './env'

import { petRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(multer.contentParser)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(petRoutes)
app.register(orgsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV === 'production') {
    console.log(error)
  } else {
    // to-do
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
