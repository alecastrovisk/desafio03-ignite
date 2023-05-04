import { Query } from '@/use-cases/search-pets'
import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchMany(query: Query, page: number): Promise<Pet[]>
}
