import { Prisma, Pet } from '@prisma/client'
import { Filter, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { Query } from '@/use-cases/search-pets'

export class InMemoryPetsRepository implements PetsRepository {
  pets: Pet[] = []

  async searchMany(
    { city, uf }: Query,
    filter: Filter,
    page: number,
  ): Promise<Pet[]> {
    if (!filter) {
      return this.pets
        .filter((pet) => city === pet.city && uf === pet.uf)
        .slice((page - 1) * 20, page * 20)
    }

    return this.pets.filter((pet) => {
      if (filter.age !== pet.age) {
        return null
      }

      if (filter.animal_size !== pet.animal_size) {
        return null
      }

      return true
    })
  }

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

    this.pets.push(pet)

    return pet
  }
}
