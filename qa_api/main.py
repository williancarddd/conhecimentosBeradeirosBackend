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
    print(keywords)
    for keyword in keywords:
        if keyword in unidecode(question.lower()):
            return db.get_context_from_keyword(keyword, comunidade)
        else:
            return db.get_context_from_categoria("Geral", comunidade)


# Rota para fazer perguntas
@app.route("/perguntar", methods=['POST'])
def ask_question():
    data = request.get_json()
    if "questions" not in data:
        return json.dumps({"error": "A chave 'questions' está ausente nos dados enviados."}), 400

    questions = data["questions"]

    results = []

    for question in questions:
        comunidade = ""
        if "comunidade" in data:
            comunidade = data["comunidade"]
        else:
            return json.dumps({"error": "A chave 'comunidade' está ausente nos dados enviados."}), 400

        categorias = db.get_categorias(comunidade)

        if "categoria" in data:
            if data["categoria"] in categorias:
                context = db.get_context_from_categoria(
                    data["categoria"], comunidade)
            else:
                return json.dumps({"error": f"A categoria '{data['keyword']}' não existe."}), 400
        else:
            context = get_context(question, comunidade)
        if context:
            results.append(question_answer(question, context))

    return json.dumps(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
