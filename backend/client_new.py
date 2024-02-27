from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from scipy.spatial import distance
import csv
import json

app = Flask(__name__)
CORS(app)

csv_file_path = 'mentore_data.csv'
mentor_data = []
precomputed_embeddings = {}

conversations = {}  # Store conversations by user_id

with open(csv_file_path, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for index, row in enumerate(csv_reader):
        mentor_data.append(row)
        # Use index as a string for unique identification, assuming no 'id' field
        mentor_id = str(index)
        row_string = ', '.join(row.values())
        # Update this line with your actual API key
        client = OpenAI(api_key='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')
        embedding = client.embeddings.create(input=[row_string], model="text-embedding-3-small").data[0].embedding
        precomputed_embeddings[mentor_id] = embedding

@app.route("/query", methods=['POST'])
def query_bot():
    data = request.json
    user_id = data['user_id']
    user_text = data['message']

    if user_id not in conversations:
        conversations[user_id] = []

    conversations[user_id].append({"role": "user", "content": user_text})

    user_embedding = client.embeddings.create(input=[user_text], model="text-embedding-3-small").data[0].embedding

    similarities = []
    for mentor_id, embedding in precomputed_embeddings.items():
        similarity = 1 - distance.cosine(user_embedding, embedding)
        similarities.append((mentor_id, similarity))

    similarities.sort(key=lambda x: x[1], reverse=True)
    top_mentors = similarities[:5]

    descriptions = [mentor_data[int(mentor_id)]["description"] for mentor_id, _ in top_mentors]
    initial_message = "Here are your 5 most likely mentors and their descriptions: " + ", ".join(descriptions)

    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=conversations[user_id]
    )
    assistant_response = response.choices[0].message.content
    conversations[user_id].append({"role": "assistant", "content": assistant_response})

    return jsonify({"message": assistant_response})

@app.route("/disconnect", methods=['POST'])
def disconnect():
    data = request.json
    user_id = data['user_id']

    if user_id in conversations:
        del conversations[user_id]

    return jsonify({"message": "Conversation data deleted for user_id: {}".format(user_id)})

if __name__ == "__main__":
    app.run(debug=True)

