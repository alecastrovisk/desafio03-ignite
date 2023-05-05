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
    const pet = await petsRepository.create({
      about: 'Lindo pet de teste',
      age: 'ADULTO',
      animal_size: 'GRANDE',
      city: 'São Paulo',
      uf: 'São Paulo',
      energy_level: 'BAIXA',
      independence_level: 'ALTA',
      name: 'Simba teste 2',
      orgId: 'id-org-teste',
    })

    const { pets } = await searchPetsUseCase.execute({
      query: {
        city: pet.city,
        uf: pet.uf,
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('Should be able to filter pets by characteristics', async () => {
    const pet = await petsRepository.create({
      about: 'Lindo pet de teste',
      age: 'ADULTO',
      animal_size: 'GRANDE',
      city: 'São Paulo',
      uf: 'São Paulo',
      energy_level: 'BAIXA',
      independence_level: 'ALTA',
      name: 'Simba teste 2',
      orgId: 'id-org-teste',
    })

    await petsRepository.create({
      about: 'pet de teste filhote',
      age: 'FILHOTE',
      animal_size: 'PEQUENO',
      city: 'São Paulo',
      uf: 'São Paulo',
      energy_level: 'BAIXA',
      independence_level: 'ALTA',
      name: 'Simba teste 2',
      orgId: 'id-org-teste',
    })

    const { pets } = await searchPetsUseCase.execute({
      query: {
        city: pet.city,
        uf: pet.uf,
      },
      filter: {
        age: pet.age,
        animal_size: pet.animal_size,
        energy_level: pet.energy_level,
        independence_level: pet.independence_level,
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ age: 'ADULTO' })])
  })

  it('Should be able to filter by page', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        about: `pet de teste filhote ${i}`,
        age: 'FILHOTE',
        animal_size: 'PEQUENO',
        city: 'São Paulo',
        uf: 'São Paulo',
        energy_level: 'BAIXA',
        independence_level: 'ALTA',
        name: 'Simba teste 2',
        orgId: 'id-org-teste',
      })
    }

    const { pets } = await searchPetsUseCase.execute({
      query: {
        city: 'São Paulo',
        uf: 'São Paulo',
      },
      page: 2,
    })

    expect(pets).toHaveLength(2)
  })
})
