import json
import os
from api_settings import app
from flask import request
from unidecode import unidecode
from ia import question_answer
from database import Database
from dotenv import load_dotenv

load_dotenv()

DB_PATH = os.getenv("DB_PATH")

db = Database(DB_PATH)


def get_context(question, comunidade):
    keywords = db.get_keywords(comunidade)
    for keyword in keywords:
        if keyword in unidecode(question.lower()):
            return db.get_context_from_keyword(keyword, comunidade)
        else:
            return db.get_context_from_categoria("Geral", comunidade)


# Rota para fazer perguntas
@app.route("/perguntar", methods=['POST'])
def ask_question():
    data = request.get_json()
    if "question" not in data:
        result = json.dumps({"error": "A chave 'question' está ausente nos dados enviados."}), 400
        print(result)
        return result

    question = data["question"]

    comunidade = ""
    if "comunidade" in data:
        comunidade = data["comunidade"]
    else:
        result = json.dumps({"error": "A chave 'comunidade' está ausente nos dados enviados."}), 400
        print(result)
        return result


    if "categoria" not in data or data["categoria"] == "":
        context = get_context(question, comunidade)
    else:
        categorias = db.get_categorias(comunidade)
        if data["categoria"] in categorias:
            context = db.get_context_from_categoria(
                data["categoria"], comunidade)
        else:
            result = json.dumps({"error": f"A categoria '{data['keyword']}' não existe."}), 400
            print(result)
            return result
    if context:
        result = json.dumps(question_answer(question, context))
        print(result)
        return result
    else:
        result = json.dumps({"sentence": "Não foi possivel encontrar a resposta para sua pergunta"})
        print(result)
        return result


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
