-- CreateEnum
CREATE TYPE "AnimalSize" AS ENUM ('MINI', 'PEQUENO', 'MEDIO', 'GRANDE', 'GIGANTE');

-- CreateEnum
CREATE TYPE "AnimalAge" AS ENUM ('FILHOTE', 'ADULTO', 'IDOSO');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "about" VARCHAR(255) NOT NULL,
    "name" TEXT NOT NULL,
    "age" "AnimalAge" NOT NULL,
    "energy_level" "EnergyLevel" NOT NULL,
    "animal_size" "AnimalSize" NOT NULL,
    "independence_level" "IndependenceLevel" NOT NULL,
    "requirements" TEXT,
    "photos" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
