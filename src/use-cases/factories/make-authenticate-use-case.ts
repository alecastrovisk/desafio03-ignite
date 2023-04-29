import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repsoitory'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(orgsRepository)

  return authenticateUseCase
}
