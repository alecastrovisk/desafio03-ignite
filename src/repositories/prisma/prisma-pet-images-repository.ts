import { prisma } from '@/lib/prisma'
import { PetImagesRepository } from '../pet-images-repository'
import { PetImage } from '@prisma/client'

export class PrismaPetImagesRepository implements PetImagesRepository {
  findByPetId(petId: string): Promise<PetImage> {
    throw new Error('Not implemented')
  }

  async create(petId: string, filename: string): Promise<PetImage> {
    const petImage = await prisma.petImage.create({
      data: {
        petId,
        filename,
      },
    })

    return petImage
  }
}
