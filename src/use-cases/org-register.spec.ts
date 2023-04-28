/* eslint-disable no-undef */
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { OrgsRepository } from '../repositories/orgs-repository'
import { OrgRegisterUseCase } from './org-register'

let orgsRepository: OrgsRepository
let orgRegisterUseCase: OrgRegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgRegisterUseCase = new OrgRegisterUseCase(orgsRepository)
  })

  it('Should be able to register an org', async () => {
    const { org } = await orgRegisterUseCase.execute({
      adress: 'Rua de exemplo',
      email: 'org@example.com',
      password: '123456',
      phone: '12345678909',
      cep: '1234457655',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
