/*
  Warnings:

  - Added the required column `caseId` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caseId" TEXT NOT NULL,
    "award" TEXT NOT NULL,
    "hearingId" TEXT NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Case_hearingId_fkey" FOREIGN KEY ("hearingId") REFERENCES "Hearing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Case_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Case" ("arbitrationCentreId", "award", "createdAt", "description", "hearingId", "id", "name", "updatedAt") SELECT "arbitrationCentreId", "award", "createdAt", "description", "hearingId", "id", "name", "updatedAt" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
CREATE UNIQUE INDEX "Case_caseId_key" ON "Case"("caseId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
