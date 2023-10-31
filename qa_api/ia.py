from transformers import pipeline
from api_settings import cache

model_name = 'pierreguillou/bert-base-cased-squad-v1.1-portuguese'
nlp = pipeline("question-answering", model=model_name, device=0)


@cache.memoize()
def question_answer(question, context):
    result = nlp(question=question, context=context)

    context_sentences = context.split('. ')

    answer = ''

    for sentence in context_sentences:
        if result["answer"] in sentence:
            answer = sentence

    return {
        "question": question,
        "sentence": answer.replace("<sep>", ". ")
    }
