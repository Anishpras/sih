/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ArbitrationCentre` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArbitrationCentre_name_key" ON "ArbitrationCentre"("name");
