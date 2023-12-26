-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_utilisateurs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "mail" TEXT,
    "role" TEXT
);
INSERT INTO "new_utilisateurs" ("discordId", "id", "mail", "nama", "role") SELECT "discordId", "id", "mail", "nama", "role" FROM "utilisateurs";
DROP TABLE "utilisateurs";
ALTER TABLE "new_utilisateurs" RENAME TO "utilisateurs";
CREATE UNIQUE INDEX "utilisateurs_discordId_key" ON "utilisateurs"("discordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
