import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

export interface Query {
  city: string
  uf: string
}

interface SearchPetsRequest {
  page: number
  query: Query
}

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchMany(query, page)

    return {
      pets,
    }
  }
}
