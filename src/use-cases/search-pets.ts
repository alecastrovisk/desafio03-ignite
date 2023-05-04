import { Filter, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

export interface Query {
  city: string
  uf: string
}

interface SearchPetsRequest {
  page: number
  query: Query
  filter: Filter
}

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    filter,
    page,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchMany(query, filter, page)

    return {
      pets,
    }
  }
}
