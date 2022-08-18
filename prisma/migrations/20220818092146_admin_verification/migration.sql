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
    "arbitrationCentreId" TEXT NOT NULL,
    CONSTRAINT "Admin_arbitrationCentreId_fkey" FOREIGN KEY ("arbitrationCentreId") REFERENCES "ArbitrationCentre" ("arbitrationCentreId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("arbitrationCentreId", "createdAt", "id", "name", "password", "updatedAt", "username") SELECT "arbitrationCentreId", "createdAt", "id", "name", "password", "updatedAt", "username" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
