/*
  Warnings:

  - The required column `id` was added to the `MediationCase` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MediationCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caseId" TEXT NOT NULL,
    "mediatorId" TEXT NOT NULL,
    "mediationCentreId" TEXT NOT NULL,
    CONSTRAINT "MediationCase_mediatorId_fkey" FOREIGN KEY ("mediatorId") REFERENCES "Mediator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MediationCase_mediationCentreId_fkey" FOREIGN KEY ("mediationCentreId") REFERENCES "MediationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MediationCase" ("caseId", "createdAt", "description", "mediationCentreId", "mediatorId", "name", "updatedAt") SELECT "caseId", "createdAt", "description", "mediationCentreId", "mediatorId", "name", "updatedAt" FROM "MediationCase";
DROP TABLE "MediationCase";
ALTER TABLE "new_MediationCase" RENAME TO "MediationCase";
CREATE UNIQUE INDEX "MediationCase_caseId_key" ON "MediationCase"("caseId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
