import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface RequestParams {
  petId: string
}

export async function getPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { petId } = request.params as RequestParams

  const getPet = makeGetPetUseCase()

  const { pet } = await getPet.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
