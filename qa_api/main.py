from transformers import pipeline
import json
from api_settings import app, cache
from flask import request
from ia import question_answer
from unidecode import unidecode

keywords = []

with open('keywords.json') as file:
    keywords = json.load(file)

def get_context(question):
    for keyword in keywords:
        if keyword in unidecode(question.lower()):
            return keywords[keyword]["context"]

# Rota para fazer perguntas
@app.route("/perguntar", methods=['POST'])
@cache.cached()
def ask_question():
    data = request.get_json()
    if "questions" not in data:
        return json.dumps({"error": "A chave 'questions' está ausente nos dados enviados."}), 400

    questions = data["questions"]
    results = []
    for question in questions:
        context = get_context(question)
        results.append(question_answer(question, context))
    return json.dumps(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
