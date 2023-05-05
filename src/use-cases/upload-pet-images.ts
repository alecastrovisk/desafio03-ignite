import { PetImagesRepository } from '@/repositories/pet-images-repository'

interface UploadPetImagesUseCaseRequest {
  imagesName: string[]
  petId: string
  path: string
}

export class UploadPetImagesUseCase {
  constructor(private petImagesRepository: PetImagesRepository) {}

  async execute({ imagesName, petId, path }: UploadPetImagesUseCaseRequest) {
    imagesName.map(async (image) =>
      this.petImagesRepository.create(petId, image, path),
    )
  }
}
