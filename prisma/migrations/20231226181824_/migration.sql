-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_utilisateurs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "mail" TEXT,
    "role" TEXT NOT NULL DEFAULT 'Admin | Tech'
);
INSERT INTO "new_utilisateurs" ("discordId", "id", "mail", "nama") SELECT "discordId", "id", "mail", "nama" FROM "utilisateurs";
DROP TABLE "utilisateurs";
ALTER TABLE "new_utilisateurs" RENAME TO "utilisateurs";
CREATE UNIQUE INDEX "utilisateurs_discordId_key" ON "utilisateurs"("discordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
