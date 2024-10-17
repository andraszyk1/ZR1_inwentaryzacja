-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lp" TEXT,
    "data" TEXT,
    "idPracownika" TEXT,
    "osobaOdpowiedzialna" TEXT,
    "nazwa" TEXT,
    "lokalizacja" TEXT,
    "producent" TEXT,
    "model" TEXT,
    "sn" TEXT,
    "typ" TEXT,
    "opis" TEXT,
    "status" TEXT,
    "nrInwentarzowyIt" TEXT,
    "os" TEXT,
    "mpk" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Item" ("createdAt", "data", "id", "idPracownika", "lokalizacja", "lp", "model", "mpk", "nazwa", "nrInwentarzowyIt", "opis", "os", "osobaOdpowiedzialna", "producent", "sn", "status", "typ", "updatedAt") SELECT "createdAt", "data", "id", "idPracownika", "lokalizacja", "lp", "model", "mpk", "nazwa", "nrInwentarzowyIt", "opis", "os", "osobaOdpowiedzialna", "producent", "sn", "status", "typ", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
