import sqlite3


class Database(object):
    def __init__(self, path):
        cursor = sqlite3.connect(path, check_same_thread=False).cursor()

        self.cursor = cursor

    def get_context_from_keyword(self, keyword, comunidade):
        return self.cursor.execute(f"""
                                SELECT tc.descricao AS textoColetado
                                FROM textos_coletados AS tc
                                JOIN textos_palavras_chave AS tpc ON tc.id = tpc.textoColetadoId
                                JOIN comunidades AS c ON tc.comunidadeId = c.id
                                WHERE tpc.palavraChave = '{keyword}' AND c.nome = '{comunidade}';
                                """).fetchone()[0]

    def get_keywords(self, comunidade):
        return sum(self.cursor.execute(f"""
                                SELECT tp.palavraChave FROM comunidades as d
                                JOIN textos_coletados AS t ON t.comunidadeId = d.id
                                JOIN textos_palavras_chave AS tp ON tp.textoColetadoId = t.id
                                WHERE d.nome = '{comunidade}'
                                """).fetchall(), ())


if __name__ == "__main__":
    db = Database('../app_api/database/dev.db')
    print(db.get_context_from_keyword("habitantes", "Comunidade de Nazaré"))
    print(db.get_keywords("Comunidade de Nazaré"))
