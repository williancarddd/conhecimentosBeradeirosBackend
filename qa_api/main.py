from transformers import pipeline
import json
from api_settings import app, cache
from flask import request

model_name = 'pierreguillou/bert-base-cased-squad-v1.1-portuguese'
nlp = pipeline("question-answering", model=model_name)

def question_answer(question, context):
    result = nlp(question=question, context=context)
    i = 0

    answer = ""

    while context[result["start"] - i] != '.':
        i += 1

    answer += context[result["start"] - i + 2:result["start"]]
    i = 0

    while context[result["start"] + i] != '.':
        i += 1

    answer += context[result["start"]:result["start"] + i]

    return {
        "question": question,
        "sentence": answer
    }

def get_context():
    return ""

# Rota para fazer perguntas
@app.route("/perguntar", methods=['POST'])
@cache.cached()
def ask_question():
    data = request.get_json()
    if "questions" not in data:
        return json.dumps({"error": "A chave 'questions' está ausente nos dados enviados."}), 400

    questions = data["questions"]
    results = []
    context = get_context()
    for question in questions:
      results.append(question_answer(question, context))
    return json.dumps(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
