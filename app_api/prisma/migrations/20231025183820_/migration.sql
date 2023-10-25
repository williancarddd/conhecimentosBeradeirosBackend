-- CreateTable
CREATE TABLE "comunidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "descricao" TEXT NOT NULL,
    "populacao" BIGINT
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "textos_coletados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "comunidadeId" INTEGER,
    "fonteId" INTEGER NOT NULL,
    "data_coletado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoriaId" INTEGER,
    CONSTRAINT "textos_coletados_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidades" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "textos_coletados_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "fontes_informacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "textos_coletados_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fontes_informacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "textos_palavras_chave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textoColetadoId" INTEGER NOT NULL,
    "palavraChave" TEXT NOT NULL,
    CONSTRAINT "textos_palavras_chave_textoColetadoId_fkey" FOREIGN KEY ("textoColetadoId") REFERENCES "textos_coletados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
