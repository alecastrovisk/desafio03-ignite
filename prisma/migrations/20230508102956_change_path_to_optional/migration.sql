/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_petId_fkey";

-- DropTable
DROP TABLE "images";

-- CreateTable
CREATE TABLE "pet_images" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_images" ADD CONSTRAINT "pet_images_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
