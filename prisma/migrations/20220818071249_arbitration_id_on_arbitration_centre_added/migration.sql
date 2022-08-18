/*
  Warnings:

  - Added the required column `arbitrationCentreId` to the `ArbitrationCentre` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Admin_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("arbitrationCentreId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("arbitrationCentreId", "createdAt", "id", "name", "password", "updatedAt", "username") SELECT "arbitrationCentreId", "createdAt", "id", "name", "password", "updatedAt", "username" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
CREATE TABLE "new_ArbitrationCentre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ArbitrationCentre" ("createdAt", "description", "id", "name", "password", "updatedAt") SELECT "createdAt", "description", "id", "name", "password", "updatedAt" FROM "ArbitrationCentre";
DROP TABLE "ArbitrationCentre";
ALTER TABLE "new_ArbitrationCentre" RENAME TO "ArbitrationCentre";
CREATE UNIQUE INDEX "ArbitrationCentre_name_key" ON "ArbitrationCentre"("name");
CREATE UNIQUE INDEX "ArbitrationCentre_arbitrationCentreId_key" ON "ArbitrationCentre"("arbitrationCentreId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
