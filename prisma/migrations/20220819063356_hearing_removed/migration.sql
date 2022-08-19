/*
  Warnings:

  - You are about to drop the `Hearing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Hearing";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caseId" TEXT NOT NULL,
    "award" TEXT,
    "hearingId" TEXT NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Case_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Case" ("arbitrationCentreId", "award", "caseId", "createdAt", "description", "hearingId", "id", "name", "updatedAt") SELECT "arbitrationCentreId", "award", "caseId", "createdAt", "description", "hearingId", "id", "name", "updatedAt" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
CREATE UNIQUE INDEX "Case_caseId_key" ON "Case"("caseId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
