import sqlite3


class Database(object):
    def __init__(self, path):
        cursor = sqlite3.connect(path, check_same_thread=False).cursor()

        self.cursor = cursor

    def get_context_from_categoria(self, categoria, comunidade):
        return ' '.join(sum(self.cursor.execute(f"""
                                SELECT tc.descricao
                                FROM textos_coletados tc
                                JOIN categorias c ON tc.comunidadeId = c.comunidadeId
                                JOIN comunidades com ON c.comunidadeId = com.id
                                WHERE com.nome = '{comunidade}' AND c.descricao = '{categoria}';
                                """).fetchall(), ()))

    def get_context_from_keyword(self, keyword, comunidade):
        return " ".join(sum(self.cursor.execute(f"""
                                SELECT tc.descricao
                                FROM textos_coletados AS tc
                                JOIN textos_coletados_categorias AS tcc ON tc.id = tcc.textoColetadoId
                                JOIN textos_palavras_chave AS tpc ON tcc.categoriaId = tpc.categoriaId
                                JOIN categorias AS cat ON tcc.categoriaId = cat.id
                                JOIN comunidades AS com ON cat.comunidadeId = com.id
                                WHERE tpc.palavraChave = '{keyword}'
                                AND com.nome = '{comunidade}';
                                """).fetchall(), ()))

    def get_categorias(self, comunidade):
        return sum(self.cursor.execute(f"""
                                SELECT cat.descricao
                                FROM categorias AS cat
                                JOIN comunidades AS com ON cat.comunidadeId = com.id
                                WHERE com.nome = '{comunidade}';
                                """).fetchall(), ())

    def get_keywords(self, comunidade):
        return sum(self.cursor.execute(f"""
                                SELECT tpc.palavraChave
                                FROM textos_palavras_chave AS tpc
                                JOIN categorias AS c ON c.id = tpc.id
                                JOIN comunidades AS com ON com.id = c.comunidadeId
                                where com.nome = '{comunidade}';
                                """).fetchall(), ())


if __name__ == "__main__":
    db = Database('../app_api/database/dev.db')
    print(db.get_context_from_categoria("Geral", "Comunidade de Nazaré"))
    print(db.get_context_from_keyword("fe", "Comunidade de Nazaré"))
    print(db.get_categorias("Comunidade de Nazaré"))
    print(db.get_keywords("Comunidade de Nazaré"))
