import { Query } from '@/use-cases/search-pets'
import { Prisma, Pet } from '@prisma/client'
import { Filter, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    throw new Error('Method not implemented.')
  }

  searchMany(
    query: Query,
    page: number,
    filter?: Filter | undefined,
  ): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
      },
      include: {
        PetImage: true,
      },
    })

    return pet
  }
}
