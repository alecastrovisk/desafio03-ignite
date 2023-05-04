import { Query } from '@/use-cases/search-pets'
import {
  AnimalAge,
  AnimalSize,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  Prisma,
} from '@prisma/client'

export interface Filter {
  age?: AnimalAge
  animal_size?: AnimalSize
  energy_level?: EnergyLevel
  independence_level?: IndependenceLevel
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchMany(query: Query, filter: Filter, page: number): Promise<Pet[]>
}
