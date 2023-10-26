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


def get_context(question, comunidade, keywords):
    for keyword in keywords:
        if keyword in unidecode(question.lower()):
            return db.get_context_from_keyword(comunidade, keyword)
        else:
            return db.get_context_from_keyword(comunidade, "geral")


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
        keywords = db.get_keywords(comunidade)
        if "keyword" in data:
            if data["keyword"] in keywords:
                context = db.get_context_from_keyword(
                    data["keyword"], comunidade)
            else:
                return json.dumps({"error": f"A keyword '{data['keyword']}' não existe."}), 400
        else:
            context = get_context(question, comunidade, keywords)
        results.append(question_answer(question, context))

    return json.dumps(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
