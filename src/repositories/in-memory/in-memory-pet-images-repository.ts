import { Image } from '@prisma/client'
import { PetImagesRepository } from '../pet-images-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetImagesRepository implements PetImagesRepository {
  petImages: Image[] = []

  async create(petId: string, filename: string, path: string): Promise<void> {
    const image: Image = {
      id: randomUUID(),
      petId,
      filename,
      path,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.petImages.push(image)
  }
}
