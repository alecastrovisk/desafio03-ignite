/*
  Warnings:

  - Added the required column `orgsId` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Made the column `energy_level` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `animal_size` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `independence_level` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "orgsId" TEXT NOT NULL,
ALTER COLUMN "energy_level" SET NOT NULL,
ALTER COLUMN "animal_size" SET NOT NULL,
ALTER COLUMN "independence_level" SET NOT NULL;

-- CreateTable
CREATE TABLE "Orgs" (
    "id" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "cep" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orgs_email_key" ON "Orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgsId_fkey" FOREIGN KEY ("orgsId") REFERENCES "Orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
