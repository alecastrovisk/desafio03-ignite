import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    files
  }
}
