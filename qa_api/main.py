from transformers import pipeline
import json
from api_settings import app, cache
from flask import request
from unidecode import unidecode
from ia import question_answer

keywords = []

with open("context.json") as file:
    keywords = json.load(file)


def get_context(question):
    for keyword in keywords:
        for item in keywords[keyword]["keywords"]:
            if item in unidecode(question.lower()):
                return keywords[keyword]["context"]
            else:
                return keywords["geral"]["context"]


# Rota para fazer perguntas
@app.route("/perguntar", methods=['POST'])
def ask_question():
    data = request.get_json()
    if "questions" not in data:
        return json.dumps({"error": "A chave 'questions' está ausente nos dados enviados."}), 400

    questions = data["questions"]

    results = []

    for question in questions:
        if "keyword" in data:
            if data["keyword"] in keywords:
                context = keywords[data["keyword"]]["context"]
            else:
                return json.dumps({"error": f"A keyword '{data['keyword']}' não existe."}), 400
        else:
            context = get_context(question)
        results.append(question_answer(question, context))

    return json.dumps(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
