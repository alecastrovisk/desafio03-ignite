import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      about: data.about,
      age: data.age,
      animal_size: data.animal_size,
      city: data.city,
      energy_level: data.energy_level,
      created_at: new Date(),
      independence_level: data.independence_level,
      name: data.name,
      orgId: data.orgId,
      uf: data.uf,
    }

    return pet
  }
}
