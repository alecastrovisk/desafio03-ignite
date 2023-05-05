import { Prisma, Pet } from '@prisma/client'
import { Filter, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { Query } from '@/use-cases/search-pets'

export class InMemoryPetsRepository implements PetsRepository {
  pets: Pet[] = []

  async searchMany(
    { city, uf }: Query,
    page: number,
    filter: Filter | undefined,
  ): Promise<Pet[]> {
    const filteredPets = this.pets
      .filter((pet) => {
        if (city !== pet.city && uf !== pet.uf) {
          return false
        }

        if (filter?.age !== undefined && filter?.age !== pet.age) {
          return false
        }

        if (
          filter?.animal_size !== undefined &&
          filter?.animal_size !== pet.animal_size
        ) {
          return false
        }

        if (
          filter?.energy_level !== undefined &&
          filter?.energy_level !== pet.energy_level
        ) {
          return false
        }

        if (
          filter?.independence_level !== undefined &&
          filter?.independence_level !== pet.independence_level
        ) {
          return false
        }

        return true
      })
      .slice((page - 1) * 20, page * 20)

    return filteredPets
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
