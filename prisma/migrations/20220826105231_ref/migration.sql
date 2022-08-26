-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hearing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "arbitratorId" TEXT,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "Hearing_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("caseId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hearing_arbitratorId_fkey" FOREIGN KEY ("arbitratorId") REFERENCES "Arbitrator" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Hearing" ("arbitratorId", "caseId", "dateTime", "id") SELECT "arbitratorId", "caseId", "dateTime", "id" FROM "Hearing";
DROP TABLE "Hearing";
ALTER TABLE "new_Hearing" RENAME TO "Hearing";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
