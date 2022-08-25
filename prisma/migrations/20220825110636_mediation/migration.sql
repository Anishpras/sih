/*
  Warnings:

  - You are about to drop the column `mobile` on the `MediationParty` table. All the data in the column will be lost.
  - You are about to drop the column `otpVerified` on the `MediationParty` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MediationParty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "mediationCaseId" TEXT,
    CONSTRAINT "MediationParty_mediationCaseId_fkey" FOREIGN KEY ("mediationCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MediationParty" ("createdAt", "id", "mediationCaseId", "name", "password", "session", "updatedAt", "username") SELECT "createdAt", "id", "mediationCaseId", "name", "password", "session", "updatedAt", "username" FROM "MediationParty";
DROP TABLE "MediationParty";
ALTER TABLE "new_MediationParty" RENAME TO "MediationParty";
CREATE UNIQUE INDEX "MediationParty_username_key" ON "MediationParty"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
