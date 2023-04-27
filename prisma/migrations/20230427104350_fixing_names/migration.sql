/*
  Warnings:

  - You are about to drop the column `orgsId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `Orgs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orgId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgsId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "orgsId",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Orgs";

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "cep" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
