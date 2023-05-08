// import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { uploadImageController } from './upload-image'

import { upload } from '@/config/upload'
import { getPetsController } from './get-pet'

// const upload = multer({ dest: 'uploads/' })

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', getPetsController)

  app.post(
    '/pets/images/:petId',
    { preHandler: upload.array('image', 6) },
    uploadImageController,
  )
}
