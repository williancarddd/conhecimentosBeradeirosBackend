/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `textos_palavras_chave` table. All the data in the column will be lost.
  - Added the required column `palavraChaveId` to the `textos_coletados_categorias` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_textos_coletados_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textoColetadoId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "palavraChaveId" INTEGER NOT NULL,
    CONSTRAINT "textos_coletados_categorias_textoColetadoId_fkey" FOREIGN KEY ("textoColetadoId") REFERENCES "textos_coletados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "textos_coletados_categorias_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "textos_coletados_categorias_palavraChaveId_fkey" FOREIGN KEY ("palavraChaveId") REFERENCES "textos_palavras_chave" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_textos_coletados_categorias" ("categoriaId", "id", "textoColetadoId") SELECT "categoriaId", "id", "textoColetadoId" FROM "textos_coletados_categorias";
DROP TABLE "textos_coletados_categorias";
ALTER TABLE "new_textos_coletados_categorias" RENAME TO "textos_coletados_categorias";
CREATE TABLE "new_textos_palavras_chave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "palavraChave" TEXT NOT NULL
);
INSERT INTO "new_textos_palavras_chave" ("id", "palavraChave") SELECT "id", "palavraChave" FROM "textos_palavras_chave";
DROP TABLE "textos_palavras_chave";
ALTER TABLE "new_textos_palavras_chave" RENAME TO "textos_palavras_chave";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
