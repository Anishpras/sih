-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArbitrationCentre" (
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
INSERT INTO "new_ArbitrationCentre" ("arbitrationCentreId", "createdAt", "description", "id", "mobile", "name", "otpVerified", "password", "updatedAt") SELECT "arbitrationCentreId", "createdAt", "description", "id", "mobile", "name", "otpVerified", "password", "updatedAt" FROM "ArbitrationCentre";
DROP TABLE "ArbitrationCentre";
ALTER TABLE "new_ArbitrationCentre" RENAME TO "ArbitrationCentre";
CREATE UNIQUE INDEX "ArbitrationCentre_name_key" ON "ArbitrationCentre"("name");
CREATE UNIQUE INDEX "ArbitrationCentre_arbitrationCentreId_key" ON "ArbitrationCentre"("arbitrationCentreId");
CREATE UNIQUE INDEX "ArbitrationCentre_mobile_key" ON "ArbitrationCentre"("mobile");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
