import { PrismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository'
import { UploadPetImagesUseCase } from '../upload-pet-images'

export function makeUploadImagesUseCase() {
  const petImagesRepository = new PrismaPetImagesRepository()
  const uploadPetImagesUseCase = new UploadPetImagesUseCase(petImagesRepository)

  return uploadPetImagesUseCase
}
