import {
  AnimalAge,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
  Pet,
} from '@prisma/client'

import { PetsRepository } from '../repositories/pets-repository'

interface RegisterUseCaseRequest {
  about: string
  name: string
  age: AnimalAge
  energy_level: EnergyLevel
  animal_size: AnimalSize
  independence_level: IndependenceLevel
  requirements?: string[]
  uf: string
  city: string
  orgId: string
}

interface RegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    about,
    age,
    animal_size,
    city,
    energy_level,
    independence_level,
    name,
    orgId,
    uf,
    requirements,
  }: RegisterUseCaseRequest): RegisterUseCaseResponse {
    // to-do: Create Orgs before register a pet!!

    return {
      pet,
    }
  }
}
