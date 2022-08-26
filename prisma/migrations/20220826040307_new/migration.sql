-- CreateTable
CREATE TABLE "Arbitrator" (
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

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "Client_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caseId" TEXT NOT NULL,
    "award" TEXT,
    "arbitratorId" TEXT,
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Case_arbitratorId_fkey" FOREIGN KEY ("arbitratorId") REFERENCES "Arbitrator" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Case_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "Order_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArbitrationCentre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mobile" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "session" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Admin" (
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

-- CreateTable
CREATE TABLE "Annexure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "link" TEXT NOT NULL,
    "caseId" TEXT,
    CONSTRAINT "Annexure_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediationCentre" (
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

-- CreateTable
CREATE TABLE "Mediator" (
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

-- CreateTable
CREATE TABLE "MediationParty" (
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

-- CreateTable
CREATE TABLE "MediationAdmin" (
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

-- CreateTable
CREATE TABLE "MediationCase" (
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

-- CreateTable
CREATE TABLE "MediationTimeLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mediationCaseId" TEXT,
    CONSTRAINT "MediationTimeLine_mediationCaseId_fkey" FOREIGN KEY ("mediationCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediationAnnexure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "link" TEXT NOT NULL,
    "mediationCaseId" TEXT,
    CONSTRAINT "MediationAnnexure_mediationCaseId_fkey" FOREIGN KEY ("mediationCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Arbitrator_registrationId_key" ON "Arbitrator"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Arbitrator_mobile_key" ON "Arbitrator"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Client_username_key" ON "Client"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Case_caseId_key" ON "Case"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "ArbitrationCentre_name_key" ON "ArbitrationCentre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArbitrationCentre_arbitrationCentreId_key" ON "ArbitrationCentre"("arbitrationCentreId");

-- CreateIndex
CREATE UNIQUE INDEX "ArbitrationCentre_mobile_key" ON "ArbitrationCentre"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_mobile_key" ON "Admin"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminId_key" ON "Admin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "MediationCentre_name_key" ON "MediationCentre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MediationCentre_mediationCentreId_key" ON "MediationCentre"("mediationCentreId");

-- CreateIndex
CREATE UNIQUE INDEX "MediationCentre_mobile_key" ON "MediationCentre"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Mediator_registrationId_key" ON "Mediator"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Mediator_mobile_key" ON "Mediator"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "MediationParty_username_key" ON "MediationParty"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MediationAdmin_username_key" ON "MediationAdmin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MediationAdmin_mediationAdminId_key" ON "MediationAdmin"("mediationAdminId");

-- CreateIndex
CREATE UNIQUE INDEX "MediationAdmin_mobile_key" ON "MediationAdmin"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "MediationCase_caseId_key" ON "MediationCase"("caseId");
