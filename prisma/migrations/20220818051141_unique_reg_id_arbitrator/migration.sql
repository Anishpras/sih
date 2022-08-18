/*
  Warnings:

  - A unique constraint covering the columns `[registrationId]` on the table `Arbitrator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Arbitrator_registrationId_key" ON "Arbitrator"("registrationId");
