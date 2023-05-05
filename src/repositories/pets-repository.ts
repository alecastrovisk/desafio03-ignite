import { Query } from '@/use-cases/search-pets'
import { Pet, Prisma } from '@prisma/client'

export interface Filter {
  age?: 'FILHOTE' | 'ADULTO' | 'IDOSO'
  animal_size?: 'MINI' | 'PEQUENO' | 'MEDIO' | 'GRANDE' | 'GIGANTE'
  energy_level?: 'BAIXA' | 'MEDIA' | 'ALTA'
  independence_level?: 'BAIXA' | 'MEDIA' | 'ALTA'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchMany(query: Query, page: number, filter?: Filter): Promise<Pet[]>
}
