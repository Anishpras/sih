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
    "arbitrationCentreId" TEXT NOT NULL,
    "arbitratorId" TEXT,
    CONSTRAINT "Case_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Case_arbitratorId_fkey" FOREIGN KEY ("arbitratorId") REFERENCES "Arbitrator" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Case" ("arbitrationCentreId", "arbitratorId", "award", "caseId", "createdAt", "description", "id", "name", "updatedAt") SELECT "arbitrationCentreId", "arbitratorId", "award", "caseId", "createdAt", "description", "id", "name", "updatedAt" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
CREATE UNIQUE INDEX "Case_caseId_key" ON "Case"("caseId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
