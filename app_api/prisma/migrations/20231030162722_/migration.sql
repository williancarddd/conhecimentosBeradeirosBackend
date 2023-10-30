/*
  Warnings:

  - You are about to drop the column `dataColetado` on the `textos_coletados` table. All the data in the column will be lost.
  - You are about to drop the column `palavraChaveId` on the `textos_coletados_categorias` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `textos_coletados_categorias` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "comunidadeId" INTEGER,
    CONSTRAINT "categorias_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidades" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_categorias" ("comunidadeId", "descricao", "id") SELECT "comunidadeId", "descricao", "id" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE TABLE "new_textos_coletados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "comunidadeId" INTEGER,
    "fonteId" INTEGER NOT NULL,
    "data_coletado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "textos_coletados_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidades" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "textos_coletados_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "fontes_informacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_textos_coletados" ("comunidadeId", "descricao", "fonteId", "id") SELECT "comunidadeId", "descricao", "fonteId", "id" FROM "textos_coletados";
DROP TABLE "textos_coletados";
ALTER TABLE "new_textos_coletados" RENAME TO "textos_coletados";
CREATE TABLE "new_textos_coletados_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textoColetadoId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    CONSTRAINT "textos_coletados_categorias_textoColetadoId_fkey" FOREIGN KEY ("textoColetadoId") REFERENCES "textos_coletados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "textos_coletados_categorias_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_textos_coletados_categorias" ("id", "textoColetadoId") SELECT "id", "textoColetadoId" FROM "textos_coletados_categorias";
DROP TABLE "textos_coletados_categorias";
ALTER TABLE "new_textos_coletados_categorias" RENAME TO "textos_coletados_categorias";
CREATE TABLE "new_textos_palavras_chave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "palavraChave" TEXT NOT NULL,
    "categoriaId" INTEGER,
    CONSTRAINT "textos_palavras_chave_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_textos_palavras_chave" ("categoriaId", "id", "palavraChave") SELECT "categoriaId", "id", "palavraChave" FROM "textos_palavras_chave";
DROP TABLE "textos_palavras_chave";
ALTER TABLE "new_textos_palavras_chave" RENAME TO "textos_palavras_chave";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
