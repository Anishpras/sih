/*
  Warnings:

  - You are about to drop the column `mediationCaseCaseId` on the `MediationTimeLine` table. All the data in the column will be lost.
  - You are about to drop the column `mediationCaseCaseId` on the `MediationAnnexure` table. All the data in the column will be lost.
  - You are about to drop the column `mediationCentreId` on the `Mediator` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MediationTimeLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mediationCaseId" TEXT,
    CONSTRAINT "MediationTimeLine_mediationCaseId_fkey" FOREIGN KEY ("mediationCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MediationTimeLine" ("createdAt", "description", "id", "updatedAt") SELECT "createdAt", "description", "id", "updatedAt" FROM "MediationTimeLine";
DROP TABLE "MediationTimeLine";
ALTER TABLE "new_MediationTimeLine" RENAME TO "MediationTimeLine";
CREATE TABLE "new_MediationAnnexure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "link" TEXT NOT NULL,
    "mediationCaseId" TEXT,
    CONSTRAINT "MediationAnnexure_mediationCaseId_fkey" FOREIGN KEY ("mediationCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MediationAnnexure" ("createdAt", "description", "id", "link", "name", "updatedAt") SELECT "createdAt", "description", "id", "link", "name", "updatedAt" FROM "MediationAnnexure";
DROP TABLE "MediationAnnexure";
ALTER TABLE "new_MediationAnnexure" RENAME TO "MediationAnnexure";
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
    CONSTRAINT "Mediator_mediationAdminId_fkey" FOREIGN KEY ("mediationAdminId") REFERENCES "MediationAdmin" ("mediationAdminId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Mediator" ("createdAt", "description", "id", "mediationAdminId", "name", "password", "registrationId", "updatedAt", "verified") SELECT "createdAt", "description", "id", "mediationAdminId", "name", "password", "registrationId", "updatedAt", "verified" FROM "Mediator";
DROP TABLE "Mediator";
ALTER TABLE "new_Mediator" RENAME TO "Mediator";
CREATE UNIQUE INDEX "Mediator_registrationId_key" ON "Mediator"("registrationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
