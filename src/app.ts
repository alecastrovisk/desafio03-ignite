import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/pets', async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string().max(255),
    animalAge: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']).default('ADULTO'),
    requirements: z.array(z.string()),
    uf: z.string(),
    city: z.string(),
  })

  const { about, animalAge, city, name, requirements, uf } =
    registerBodySchema.parse(request.body)

  await prisma.pets.create({
    data: {
      about,
      age: animalAge,
      city,
      uf,
      name,
      requirements,
    },
  })

  return reply.status(200).send()
})
