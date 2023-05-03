-- CreateEnum
CREATE TYPE "Statut" AS ENUM ('AFAIRE', 'ENCOURS', 'TERMINE');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "statut" "Statut" NOT NULL DEFAULT 'AFAIRE',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
