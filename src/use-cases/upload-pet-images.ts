import { PetImagesRepository } from '@/repositories/pet-images-repository'

interface UploadPetImagesUseCaseRequest {
  imagesName: string[]
  petId: string
}

export class UploadPetImagesUseCase {
  constructor(private petImagesRepository: PetImagesRepository) {}

  async execute({ imagesName, petId }: UploadPetImagesUseCaseRequest) {
    imagesName.map(async (image) =>
      this.petImagesRepository.create(petId, image),
    )
  }
}
