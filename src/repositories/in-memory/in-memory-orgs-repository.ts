import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(orgId: string) {
    const org = this.items.find((item) => item.id === orgId)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateWithoutPetsInput) {
    const org: Org = {
      id: randomUUID(),
      adress: data.adress,
      cep: data.cep || null,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
