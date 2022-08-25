/*
  Warnings:

  - Added the required column `mobile` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `MediationCentre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `MediationParty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Mediator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Arbitrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `MediationAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "adminId" TEXT NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Admin_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("arbitrationCentreId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("adminId", "arbitrationCentreId", "createdAt", "id", "name", "password", "updatedAt", "username", "verified") SELECT "adminId", "arbitrationCentreId", "createdAt", "id", "name", "password", "updatedAt", "username", "verified" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
CREATE UNIQUE INDEX "Admin_mobile_key" ON "Admin"("mobile");
CREATE UNIQUE INDEX "Admin_adminId_key" ON "Admin"("adminId");
CREATE TABLE "new_MediationCentre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mediationCentreId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_MediationCentre" ("createdAt", "description", "id", "mediationCentreId", "name", "password", "updatedAt") SELECT "createdAt", "description", "id", "mediationCentreId", "name", "password", "updatedAt" FROM "MediationCentre";
DROP TABLE "MediationCentre";
ALTER TABLE "new_MediationCentre" RENAME TO "MediationCentre";
CREATE UNIQUE INDEX "MediationCentre_name_key" ON "MediationCentre"("name");
CREATE UNIQUE INDEX "MediationCentre_mediationCentreId_key" ON "MediationCentre"("mediationCentreId");
CREATE UNIQUE INDEX "MediationCentre_mobile_key" ON "MediationCentre"("mobile");
CREATE TABLE "new_MediationParty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "mediationCaseId" TEXT,
    CONSTRAINT "MediationParty_mediationCaseId_fkey" FOREIGN KEY ("mediationCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MediationParty" ("createdAt", "id", "mediationCaseId", "name", "password", "updatedAt", "username") SELECT "createdAt", "id", "mediationCaseId", "name", "password", "updatedAt", "username" FROM "MediationParty";
DROP TABLE "MediationParty";
ALTER TABLE "new_MediationParty" RENAME TO "MediationParty";
CREATE UNIQUE INDEX "MediationParty_username_key" ON "MediationParty"("username");
CREATE UNIQUE INDEX "MediationParty_mobile_key" ON "MediationParty"("mobile");
CREATE TABLE "new_Mediator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "mediationAdminId" TEXT,
    CONSTRAINT "Mediator_mediationAdminId_fkey" FOREIGN KEY ("mediationAdminId") REFERENCES "MediationAdmin" ("mediationAdminId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Mediator" ("createdAt", "description", "id", "mediationAdminId", "name", "password", "registrationId", "updatedAt", "verified") SELECT "createdAt", "description", "id", "mediationAdminId", "name", "password", "registrationId", "updatedAt", "verified" FROM "Mediator";
DROP TABLE "Mediator";
ALTER TABLE "new_Mediator" RENAME TO "Mediator";
CREATE UNIQUE INDEX "Mediator_registrationId_key" ON "Mediator"("registrationId");
CREATE UNIQUE INDEX "Mediator_mobile_key" ON "Mediator"("mobile");
CREATE TABLE "new_Arbitrator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "adminId" TEXT NOT NULL,
    CONSTRAINT "Arbitrator_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("adminId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Arbitrator" ("adminId", "createdAt", "description", "id", "name", "password", "registrationId", "updatedAt", "verified") SELECT "adminId", "createdAt", "description", "id", "name", "password", "registrationId", "updatedAt", "verified" FROM "Arbitrator";
DROP TABLE "Arbitrator";
ALTER TABLE "new_Arbitrator" RENAME TO "Arbitrator";
CREATE UNIQUE INDEX "Arbitrator_registrationId_key" ON "Arbitrator"("registrationId");
CREATE UNIQUE INDEX "Arbitrator_mobile_key" ON "Arbitrator"("mobile");
CREATE TABLE "new_MediationAdmin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mediationAdminId" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "mediationCentreId" TEXT NOT NULL,
    CONSTRAINT "MediationAdmin_mediationCentreId_fkey" FOREIGN KEY ("mediationCentreId") REFERENCES "MediationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MediationAdmin" ("createdAt", "id", "mediationAdminId", "mediationCentreId", "name", "password", "updatedAt", "username", "verified") SELECT "createdAt", "id", "mediationAdminId", "mediationCentreId", "name", "password", "updatedAt", "username", "verified" FROM "MediationAdmin";
DROP TABLE "MediationAdmin";
ALTER TABLE "new_MediationAdmin" RENAME TO "MediationAdmin";
CREATE UNIQUE INDEX "MediationAdmin_username_key" ON "MediationAdmin"("username");
CREATE UNIQUE INDEX "MediationAdmin_mediationAdminId_key" ON "MediationAdmin"("mediationAdminId");
CREATE UNIQUE INDEX "MediationAdmin_mobile_key" ON "MediationAdmin"("mobile");
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "Client_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("caseId", "createdAt", "id", "name", "password", "updatedAt", "username") SELECT "caseId", "createdAt", "id", "name", "password", "updatedAt", "username" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_mobile_key" ON "Client"("mobile");
CREATE UNIQUE INDEX "Client_username_key" ON "Client"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
