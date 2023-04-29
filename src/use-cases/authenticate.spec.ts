/* eslint-disable no-undef */
import { hash } from 'bcrypt'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let orgsRepository: OrgsRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    authenticateUseCase = new AuthenticateUseCase(orgsRepository)
  })

  it('Should be able to authenticate', async () => {
    await orgsRepository.create({
      adress: 'Rua de teste',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      phone: '12345678909',
      cep: '12345678',
    })

    const { org } = await authenticateUseCase.execute({
      email: 'org@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('It should not be able to authenticate with wrong email', async () => {
    expect(async () =>
      authenticateUseCase.execute({
        email: 'org@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      adress: 'Rua de teste',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      phone: '12345678909',
      cep: '12345678',
    })

    expect(
      async () =>
        await authenticateUseCase.execute({
          email: 'org@example.com',
          password: '123455',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
