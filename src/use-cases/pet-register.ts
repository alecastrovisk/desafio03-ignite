import {
  AnimalAge,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
  Pet,
} from '@prisma/client'

import { PetsRepository } from '../repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface RegisterUseCaseRequest {
  about: string
  name: string
  age: AnimalAge
  energy_level: EnergyLevel
  animal_size: AnimalSize
  independence_level: IndependenceLevel
  uf: string
  city: string
  orgId: string
}

interface RegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orgExists = await this.orgsRepository.findById(orgId)

    if (!orgExists) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      animal_size,
      city,
      energy_level,
      independence_level,
      name,
      uf,
      orgId,
    })

    return {
      pet,
    }
  }
}
