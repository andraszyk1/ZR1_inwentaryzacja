-- CreateTable
CREATE TABLE "Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lp" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "idPracownika" INTEGER NOT NULL,
    "osobaOdpowiedzialna" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "lokalizacja" TEXT NOT NULL,
    "producent" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "sn" TEXT NOT NULL,
    "typ" TEXT NOT NULL,
    "opis" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "nrInwentarzowyIt" INTEGER NOT NULL,
    "os" TEXT NOT NULL,
    "mpk" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
