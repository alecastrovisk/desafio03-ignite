import { makeUploadImagesUseCase } from '@/use-cases/factories/make-upload-images-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface RequestParams {
  petId: string
}

export async function uploadImageController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { petId } = request.params as RequestParams

  const images = request.files

  const images_name = images.map((file: any) => file.filename)

  const uploadPetImagesUseCase = makeUploadImagesUseCase()

  await uploadPetImagesUseCase.execute({
    petId,
    imagesName: images_name,
  })

  return reply.status(201).send()
}
