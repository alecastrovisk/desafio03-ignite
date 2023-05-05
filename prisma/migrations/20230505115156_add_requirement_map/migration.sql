/*
  Warnings:

  - You are about to drop the `Requirement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_petId_fkey";

-- DropTable
DROP TABLE "Requirement";

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "petId" TEXT,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
