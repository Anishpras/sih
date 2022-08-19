/*
  Warnings:

  - A unique constraint covering the columns `[caseId]` on the table `Arbitrator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Arbitrator" ADD COLUMN "caseId" TEXT;

-- AlterTable
ALTER TABLE "Case" ADD COLUMN "arbitratorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Arbitrator_caseId_key" ON "Arbitrator"("caseId");
