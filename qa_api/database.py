import sqlite3


class Database(object):
    def __init__(self, path):
        cursor = sqlite3.connect(path, check_same_thread=False).cursor()

        self.cursor = cursor

    def get_context_from_categoria(self, categoria, comunidade):
        return ' '.join(sum(self.cursor.execute(f"""
                                SELECT tc.descricao AS descricao_texto_coletado
                                FROM textos_coletados AS tc
                                JOIN categorias AS cat ON tc.categoriaId = cat.id
                                JOIN comunidades AS c ON tc.comunidadeId = c.id
                                WHERE cat.descricao = '{categoria}'
                                AND c.nome = '{comunidade}';
                                """).fetchall(), ()))

    def get_context_from_keyword(self, keyword, comunidade):
        return " ".join(sum(self.cursor.execute(f"""
                                SELECT tc.descricao AS context
                                FROM textos_coletados AS tc
                                JOIN textos_palavras_chave AS tpc ON tc.id = tpc.textoColetadoId
                                JOIN comunidades AS c ON tc.comunidadeId = c.id
                                WHERE tpc.palavraChave = '{keyword}' AND c.nome = '{comunidade}';
                                """).fetchall(), ()))

    def get_categorias(self, comunidade):
        return sum(self.cursor.execute(f"""
                                SELECT DISTINCT cat.descricao AS categoria
                                FROM categorias AS cat
                                JOIN textos_coletados AS tc ON cat.id = tc.categoriaId
                                JOIN comunidades AS c ON tc.comunidadeId = c.id
                                WHERE c.nome = '{comunidade}';
                                """).fetchall(), ())

    def get_keywords(self, comunidade):
        return sum(self.cursor.execute(f"""
                                SELECT tp.palavraChave FROM comunidades as d
                                JOIN textos_coletados AS t ON t.comunidadeId = d.id
                                JOIN textos_palavras_chave AS tp ON tp.textoColetadoId = t.id
                                WHERE d.nome = '{comunidade}'
                                """).fetchall(), ())


if __name__ == "__main__":
    db = Database('../app_api/database/dev.db')
    print(db.get_context_from_categoria("História", "Comunidade de Nazaré"))
    print(db.get_context_from_keyword("habitantes", "Comunidade de Nazaré"))
    print(db.get_categorias("Comunidade de Nazaré"))
    print(db.get_keywords("Comunidade de Nazaré"))
