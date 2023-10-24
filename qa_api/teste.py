import transformers
from transformers import pipeline

context = ""

with open("data.txt", "r") as file:
    context = file.read()

context_sentences = context.split('. ')

model_name = 'pierreguillou/bert-base-cased-squad-v1.1-portuguese'
nlp = pipeline("question-answering", model=model_name, device=-1)

results = []

questions = [
  "Quais gêneros musicais são apreciados e populares entre os membros da comunidade?",
]


def run(question):
  result = nlp(question=question, context=context)
  for sentence in context_sentences:
    if result["answer"] in sentence:
      return [question, sentence]


for question in questions:
  results.append(run(question))


for response in results:
  print(response[0])
  print(response[1])
  print("")
