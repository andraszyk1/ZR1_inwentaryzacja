-- CreateTable
CREATE TABLE "User" (
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
