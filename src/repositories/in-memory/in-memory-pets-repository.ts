import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { Query } from '@/use-cases/search-pets'

export class InMemoryPetsRepository implements PetsRepository {
  pets: Pet[] = []

  async searchMany({ city, uf }: Query, page: number): Promise<Pet[]> {
    return this.pets
      .filter((pet) => pet.city.includes(city) && pet.uf.includes(uf))
      .slice((page - 1) * 20, page * 20)
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
