/*
  Warnings:

  - You are about to drop the column `awardId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `awardsId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Case` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "award" TEXT NOT NULL,
    "hearingId" TEXT NOT NULL,
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Case_hearingId_fkey" FOREIGN KEY ("hearingId") REFERENCES "Hearing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Case_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Case" ("arbitrationCentreId", "award", "createdAt", "description", "hearingId", "id", "name", "updatedAt") SELECT "arbitrationCentreId", "award", "createdAt", "description", "hearingId", "id", "name", "updatedAt" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
