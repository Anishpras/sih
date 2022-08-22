/*
  Warnings:

  - Made the column `adminId` on table `Arbitrator` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arbitrator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "adminId" TEXT NOT NULL,
    CONSTRAINT "Arbitrator_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("adminId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Arbitrator" ("adminId", "createdAt", "description", "id", "name", "password", "registrationId", "updatedAt", "verified") SELECT "adminId", "createdAt", "description", "id", "name", "password", "registrationId", "updatedAt", "verified" FROM "Arbitrator";
DROP TABLE "Arbitrator";
ALTER TABLE "new_Arbitrator" RENAME TO "Arbitrator";
CREATE UNIQUE INDEX "Arbitrator_registrationId_key" ON "Arbitrator"("registrationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
