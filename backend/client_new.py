from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from scipy.spatial import distance
import csv
import os
import pickle  # Ensure pickle is imported
import random

app = Flask(__name__)
CORS(app)

# Load OpenAI API key from environment variable
#client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

client = OpenAI(api_key='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')


csv_file_path = 'output.csv'
mentor_data = {}  # Initialize as an empty dictionary
precomputed_embeddings = {}

# Load and parse CSV data
with open(csv_file_path, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        mentor_name = row['Name']
        mentor_data[mentor_name] = row['Bio']

# Load precomputed embeddings
pickle_file_path = 'precomputed_embeddings.pkl'
try:
    with open(pickle_file_path, 'rb') as pickle_file:
        precomputed_embeddings = pickle.load(pickle_file)
except FileNotFoundError:
    print("Pickle file not found. Please ensure embeddings are precomputed.")

conversations = {}

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
    for mentor_name, embedding in precomputed_embeddings.items():
        similarity = 1 - distance.cosine(user_embedding, embedding)
        similarities.append((mentor_name, similarity))

    similarities.sort(key=lambda x: x[1], reverse=True)
    top_mentors = similarities[:5]

    # Adjust to include mentor names and handle missing bios
    descriptions = []
    for mentor_name, _ in top_mentors:
        bio = mentor_data.get(mentor_name, "Bio not available")
        descriptions.append(f"{mentor_name}: {bio}")

    initial_message = "Here are your 5 most likely mentors and their bios: " + "; ".join(descriptions)

    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=conversations[user_id]
    )
    assistant_response = response.choices[0].message.content
    conversations[user_id].append({"role": "assistant", "content": assistant_response})

    return jsonify({"initial_message": initial_message, "assistant_response": assistant_response})

@app.route("/disconnect", methods=['POST'])
def disconnect():
    data = request.json
    user_id = data['user_id']

    if user_id in conversations:
        del conversations[user_id]

    return jsonify({"message": "Conversation data deleted for user_id: {}".format(user_id)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

