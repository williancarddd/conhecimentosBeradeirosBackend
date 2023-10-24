import transformers
from transformers import pipeline
from flask import Flask, request
import json

model_name = 'pierreguillou/bert-base-cased-squad-v1.1-portuguese'
nlp = pipeline("question-answering", model=model_name, device=0)

with open("data.txt", "r") as file:
    context = file.read()

context_sentences = context.split('. ')

app = Flask(__name__)

def np_f(question, context):
    result = nlp(question=question, context=context)

    for sentence in context_sentences:
        if result["answer"] in sentence:
            return {
                "question": question, 
                "sentence": sentence
            }

# Rota para fazer perguntas
@app.route("/perguntar", methods=['POST'])
def ask_question():
    data = request.get_json()
    if "questions" not in data:
        return json.dumps({"error": "A chave 'questions' está ausente nos dados enviados."}), 400

    questions = data["questions"]
    results = []
    for question in questions:
      print(question)
      results.append(np_f(question, context))
    print(results)
    return json.dumps(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
