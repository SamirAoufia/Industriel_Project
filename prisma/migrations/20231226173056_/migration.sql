/*
  Warnings:

  - You are about to drop the `Utilisateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Utilisateur";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "mail" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_discordId_key" ON "utilisateurs"("discordId");
