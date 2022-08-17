/*
  Warnings:

  - You are about to drop the column `arbitratorId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Case` table. All the data in the column will be lost.
  - Added the required column `arguements` to the `Hearing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evidence` to the `Hearing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arbitrationCentreId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `award` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awardId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awardsId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caseId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ArbitrationCentre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Admin_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "_ArbitratorToCase" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ArbitratorToCase_A_fkey" FOREIGN KEY ("A") REFERENCES "Arbitrator" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArbitratorToCase_B_fkey" FOREIGN KEY ("B") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CaseToClient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CaseToClient_A_fkey" FOREIGN KEY ("A") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CaseToClient_B_fkey" FOREIGN KEY ("B") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arbitrator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Arbitrator" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Arbitrator";
DROP TABLE "Arbitrator";
ALTER TABLE "new_Arbitrator" RENAME TO "Arbitrator";
CREATE TABLE "new_Hearing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "evidence" TEXT NOT NULL,
    "arguements" TEXT NOT NULL
);
INSERT INTO "new_Hearing" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Hearing";
DROP TABLE "Hearing";
ALTER TABLE "new_Hearing" RENAME TO "Hearing";
CREATE TABLE "new_Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "award" TEXT NOT NULL,
    "hearingId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "awardsId" TEXT NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    "awardId" TEXT NOT NULL,
    CONSTRAINT "Case_hearingId_fkey" FOREIGN KEY ("hearingId") REFERENCES "Hearing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Case_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Case" ("createdAt", "description", "hearingId", "id", "name", "orderId", "updatedAt") SELECT "createdAt", "description", "hearingId", "id", "name", "orderId", "updatedAt" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL
);
INSERT INTO "new_Client" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_username_key" ON "Client"("username");
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "Order_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ArbitratorToCase_AB_unique" ON "_ArbitratorToCase"("A", "B");

-- CreateIndex
CREATE INDEX "_ArbitratorToCase_B_index" ON "_ArbitratorToCase"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToClient_AB_unique" ON "_CaseToClient"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToClient_B_index" ON "_CaseToClient"("B");
