/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dn" TEXT,
    "distinguishedName" TEXT,
    "userPrincipalName" TEXT,
    "sAMAccountName" TEXT,
    "mail" TEXT,
    "lockoutTime" TEXT,
    "whenCreated" TEXT,
    "pwdLastSet" TEXT,
    "userAccountControl" TEXT,
    "employeeID" TEXT,
    "sn" TEXT,
    "givenName" TEXT,
    "initials" TEXT,
    "cn" TEXT,
    "displayName" TEXT,
    "comment" TEXT,
    "description" TEXT
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
