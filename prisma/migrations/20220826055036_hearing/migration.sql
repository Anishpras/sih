-- CreateTable
CREATE TABLE "Hearing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL,
    "mode" BOOLEAN NOT NULL,
    "arbitratorId" TEXT,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "Hearing_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hearing_arbitratorId_fkey" FOREIGN KEY ("arbitratorId") REFERENCES "Arbitrator" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
