/* eslint-disable no-undef */

import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let getPetUseCase: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    getPetUseCase = new GetPetUseCase(petsRepository)
  })

  it('Should be able to get all pet details', async () => {
    const createdPet = await petsRepository.create({
      id: 'pet-id-test',
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

    const { pet } = await getPetUseCase.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual('pet-id-test')
  })
})
