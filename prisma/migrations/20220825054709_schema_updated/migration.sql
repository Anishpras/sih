/*
  Warnings:

  - You are about to drop the column `caseId` on the `MediationParty` table. All the data in the column will be lost.
  - You are about to drop the column `mediationCaseCaseId` on the `MediationParty` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `MediationAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `Mediator` table. All the data in the column will be lost.
  - Added the required column `mediationAdminId` to the `MediationAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediationCentreId` to the `Mediator` table without a default value. This is not possible if the table is not empty.

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
    "mediationCaseId" TEXT,
    CONSTRAINT "MediationParty_mediationCaseId_fkey" FOREIGN KEY ("mediationCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MediationParty" ("createdAt", "id", "name", "password", "updatedAt", "username") SELECT "createdAt", "id", "name", "password", "updatedAt", "username" FROM "MediationParty";
DROP TABLE "MediationParty";
ALTER TABLE "new_MediationParty" RENAME TO "MediationParty";
CREATE UNIQUE INDEX "MediationParty_username_key" ON "MediationParty"("username");
CREATE TABLE "new_MediationAdmin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mediationAdminId" TEXT NOT NULL,
    "mediationCentreId" TEXT NOT NULL,
    CONSTRAINT "MediationAdmin_mediationCentreId_fkey" FOREIGN KEY ("mediationCentreId") REFERENCES "MediationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MediationAdmin" ("createdAt", "id", "mediationCentreId", "name", "password", "updatedAt", "username", "verified") SELECT "createdAt", "id", "mediationCentreId", "name", "password", "updatedAt", "username", "verified" FROM "MediationAdmin";
DROP TABLE "MediationAdmin";
ALTER TABLE "new_MediationAdmin" RENAME TO "MediationAdmin";
CREATE UNIQUE INDEX "MediationAdmin_username_key" ON "MediationAdmin"("username");
CREATE UNIQUE INDEX "MediationAdmin_mediationAdminId_key" ON "MediationAdmin"("mediationAdminId");
CREATE TABLE "new_Mediator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "mediationAdminId" TEXT,
    "mediationCentreId" TEXT NOT NULL,
    CONSTRAINT "Mediator_mediationAdminId_fkey" FOREIGN KEY ("mediationAdminId") REFERENCES "MediationAdmin" ("mediationAdminId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Mediator_mediationCentreId_fkey" FOREIGN KEY ("mediationCentreId") REFERENCES "MediationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mediator" ("createdAt", "description", "id", "mediationAdminId", "name", "password", "registrationId", "updatedAt", "verified") SELECT "createdAt", "description", "id", "mediationAdminId", "name", "password", "registrationId", "updatedAt", "verified" FROM "Mediator";
DROP TABLE "Mediator";
ALTER TABLE "new_Mediator" RENAME TO "Mediator";
CREATE UNIQUE INDEX "Mediator_registrationId_key" ON "Mediator"("registrationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
