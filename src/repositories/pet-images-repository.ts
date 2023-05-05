export interface PetImagesRepository {
  create(petId: string, filename: string, path: string): Promise<void>
}
