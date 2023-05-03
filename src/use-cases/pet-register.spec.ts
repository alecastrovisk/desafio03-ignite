/* eslint-disable no-undef */
import { PetRegisterUseCase } from './pet-register'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let petRegisterUseCase: PetRegisterUseCase

describe('Pet Register Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    petRegisterUseCase = new PetRegisterUseCase(petsRepository, orgsRepository)
  })

  it('Should be able to register a pet', async () => {
    await orgsRepository.create({
      id: 'id-org-teste',
      adress: 'Rua de exemplo',
      email: 'org@example.com',
      password_hash: '123456',
      phone: '12345678909',
      cep: '1234457655',
    })

    const { pet } = await petRegisterUseCase.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should not be able to register a pet without an org', async () => {
    await expect(() =>
      petRegisterUseCase.execute({
        about: 'Lindo pet de teste',
        age: 'ADULTO',
        animal_size: 'GRANDE',
        city: 'Manaus',
        uf: 'Amazonas',
        energy_level: 'BAIXA',
        independence_level: 'ALTA',
        name: 'Simba teste',
        orgId: 'not-exist-id',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
