from transformers import pipeline

model_name = 'pierreguillou/bert-base-cased-squad-v1.1-portuguese'
nlp = pipeline("question-answering", model=model_name)


def question_answer(question, context):
    result = nlp(question=question, context=context)
    i = 0

    answer = ""

    while context[result["start"] - i] != '.':
        if i > 200:
            i = result["start"]
            break
        i += 1

    answer += context[result["start"] - i + 2:result["start"]]
    i = 0

    while context[result["start"] + i] != '.':
        if i > 200:
            i = len(context) - result["start"]
            break
        i += 1

    answer += context[result["start"]:result["start"] + i]

    return {
        "question": question,
        "sentence": answer
    }
