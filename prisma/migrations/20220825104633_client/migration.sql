/*
  Warnings:

  - You are about to drop the column `mobile` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `otpVerified` on the `Client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
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
INSERT INTO "new_Client" ("caseId", "createdAt", "id", "name", "password", "session", "updatedAt", "username") SELECT "caseId", "createdAt", "id", "name", "password", "session", "updatedAt", "username" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_username_key" ON "Client"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
