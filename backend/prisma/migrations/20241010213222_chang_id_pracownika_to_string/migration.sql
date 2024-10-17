-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lp" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "idPracownika" TEXT NOT NULL,
    "osobaOdpowiedzialna" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "lokalizacja" TEXT NOT NULL,
    "producent" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "sn" TEXT NOT NULL,
    "typ" TEXT NOT NULL,
    "opis" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "nrInwentarzowyIt" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "mpk" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Item" ("createdAt", "data", "id", "idPracownika", "lokalizacja", "lp", "model", "mpk", "nazwa", "nrInwentarzowyIt", "opis", "os", "osobaOdpowiedzialna", "producent", "sn", "status", "typ", "updatedAt") SELECT "createdAt", "data", "id", "idPracownika", "lokalizacja", "lp", "model", "mpk", "nazwa", "nrInwentarzowyIt", "opis", "os", "osobaOdpowiedzialna", "producent", "sn", "status", "typ", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
