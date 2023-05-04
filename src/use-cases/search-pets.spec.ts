import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

/* eslint-disable no-undef */
let petsRepository: InMemoryPetsRepository
let searchPetsUseCase: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    searchPetsUseCase = new SearchPetsUseCase(petsRepository)
  })

  it('Should be able to search pets', async () => {
    await petsRepository.create({
      about: 'Lindo pet de teste',
      age: 'ADULTO',
      animal_size: 'GRANDE',
      city: 'Manaus',
      uf: 'Amazonas',
      energy_level: 'BAIXA',
      independence_level: 'ALTA',
      name: 'Simba teste',
      orgId: 'id-org-teste',
    })

    const pet = await petsRepository.create({
      about: 'Lindo pet de teste',
      age: 'ADULTO',
      animal_size: 'GRANDE',
      city: 'São Paulo',
      uf: 'São Paulo',
      energy_level: 'BAIXA',
      independence_level: 'ALTA',
      name: 'Simba teste',
      orgId: 'id-org-teste',
    })

    const { pets } = await searchPetsUseCase.execute({
      query: { city: pet.city, uf: pet.uf },
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })
})
