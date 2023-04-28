import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateWithoutPetsInput): Promise<Org> {
    const org = prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    return prisma.org.findUnique({
      where: {
        email,
      },
    })
  }
}
