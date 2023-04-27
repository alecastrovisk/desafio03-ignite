import {
  AnimalAge,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
  Pets,
} from '@prisma/client'
import { PetsRepository } from '../../repositories/pets-repository'

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
  pet: Pets
}

export class RegisterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute() {}
}
