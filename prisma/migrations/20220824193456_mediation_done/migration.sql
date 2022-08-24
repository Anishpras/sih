-- CreateTable
CREATE TABLE "MediationCentre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mediationCentreId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
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
    "adminId" TEXT NOT NULL,
    "mediationAdminId" TEXT,
    CONSTRAINT "Mediator_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mediator_mediationAdminId_fkey" FOREIGN KEY ("mediationAdminId") REFERENCES "MediationAdmin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediationParty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "mediationCaseCaseId" TEXT,
    CONSTRAINT "MediationParty_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MediationParty_mediationCaseCaseId_fkey" FOREIGN KEY ("mediationCaseCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
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
    "adminId" TEXT NOT NULL,
    "mediationCentreId" TEXT NOT NULL,
    CONSTRAINT "MediationAdmin_mediationCentreId_fkey" FOREIGN KEY ("mediationCentreId") REFERENCES "MediationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediationCase" (
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
    "mediationCaseCaseId" TEXT,
    CONSTRAINT "MediationTimeLine_mediationCaseCaseId_fkey" FOREIGN KEY ("mediationCaseCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MediationAnnexure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "link" TEXT NOT NULL,
    "mediationCaseCaseId" TEXT,
    CONSTRAINT "MediationAnnexure_mediationCaseCaseId_fkey" FOREIGN KEY ("mediationCaseCaseId") REFERENCES "MediationCase" ("caseId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MediationCentre_name_key" ON "MediationCentre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MediationCentre_mediationCentreId_key" ON "MediationCentre"("mediationCentreId");

-- CreateIndex
CREATE UNIQUE INDEX "Mediator_registrationId_key" ON "Mediator"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "MediationParty_username_key" ON "MediationParty"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MediationAdmin_username_key" ON "MediationAdmin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MediationAdmin_adminId_key" ON "MediationAdmin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "MediationCase_caseId_key" ON "MediationCase"("caseId");
