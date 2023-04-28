import { UserAlreadyExistsError } from '@/use-cases/errors/user-aready-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-org-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterOrgsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    adress: z.string(),
    cep: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { adress, cep, email, password, phone } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      adress,
      cep,
      email,
      password,
      phone,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
