import { PetImage } from '@prisma/client'

export interface PetImagesRepository {
  create(petId: string, filename: string): Promise<PetImage>
  findByPetId(petId: string): Promise<PetImage>
}
