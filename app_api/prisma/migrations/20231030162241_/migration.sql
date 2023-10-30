/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `textos_coletados_categorias` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `textos_palavras_chave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comunidadeId` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_textos_coletados_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textoColetadoId" INTEGER NOT NULL,
    "palavraChaveId" INTEGER NOT NULL,
    CONSTRAINT "textos_coletados_categorias_textoColetadoId_fkey" FOREIGN KEY ("textoColetadoId") REFERENCES "textos_coletados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "textos_coletados_categorias_palavraChaveId_fkey" FOREIGN KEY ("palavraChaveId") REFERENCES "textos_palavras_chave" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_textos_coletados_categorias" ("id", "palavraChaveId", "textoColetadoId") SELECT "id", "palavraChaveId", "textoColetadoId" FROM "textos_coletados_categorias";
DROP TABLE "textos_coletados_categorias";
ALTER TABLE "new_textos_coletados_categorias" RENAME TO "textos_coletados_categorias";
CREATE TABLE "new_textos_palavras_chave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "palavraChave" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    CONSTRAINT "textos_palavras_chave_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_textos_palavras_chave" ("id", "palavraChave") SELECT "id", "palavraChave" FROM "textos_palavras_chave";
DROP TABLE "textos_palavras_chave";
ALTER TABLE "new_textos_palavras_chave" RENAME TO "textos_palavras_chave";
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    CONSTRAINT "categorias_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_categorias" ("descricao", "id") SELECT "descricao", "id" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
