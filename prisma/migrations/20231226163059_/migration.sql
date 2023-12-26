/*
  Warnings:

  - You are about to drop the column `avatar` on the `Utilisateur` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Utilisateur" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Utilisateur'
);
INSERT INTO "new_Utilisateur" ("discordId", "id") SELECT "discordId", "id" FROM "Utilisateur";
DROP TABLE "Utilisateur";
ALTER TABLE "new_Utilisateur" RENAME TO "Utilisateur";
CREATE UNIQUE INDEX "Utilisateur_discordId_key" ON "Utilisateur"("discordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
