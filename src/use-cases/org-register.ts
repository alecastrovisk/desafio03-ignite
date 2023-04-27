import { Org } from '@prisma/client'
import { OrgsRepository } from '../repositories/orgs-repository'
import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from './errors/user-aready-exists-error'

interface OrgRegisterUseCaseRequest {
  adress: string
  cep?: string | null
  phone: string
  email: string
  password: string
}

interface OrgRegisterUseCaseResponse {
  org: Org
}

export class OrgRegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    adress,
    email,
    password,
    phone,
    cep,
  }: OrgRegisterUseCaseRequest): Promise<OrgRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      adress,
      email,
      password_hash,
      phone,
      cep,
    })

    return {
      org,
    }
  }
}
