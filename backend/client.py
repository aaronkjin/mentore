from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from scipy.spatial import distance
import csv
import json

# Flask app initialization
app = Flask(__name__)
CORS(app)

# Load CSV data and convert it to a list of dictionaries
csv_file_path = 'mentore_data.csv'
csv_content_by_row = []
precompute = []

with open(csv_file_path, mode='r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    # Skipping the header row if your CSV has one
    next(csv_reader)
    for row in csv_reader:
        csv_content_by_row.append(row)

# Initialize the OpenAI client with your API key
client = OpenAI(api_key='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')

def generate_embeddings(data, model="text-embedding-3-small"):
    embeddings = []
    for row in data:
        row_string = ', '.join(row)
        embeddings.append(client.embeddings.create(input = [row_string], model=model).data[0].embedding)
    return embeddings

@app.route("/query", methods=['POST'])
def query_bot():
    # Read the incoming message from the JSON payload
    data = request.json

    user_text = data['message']
    user_embedding = client.embeddings.create(input = [user_text], model="text-embedding-3-small").data[0].embedding

    max_sim = float('-inf')
    id = 0
    # Find maximum cosine similarity
    for i in range(len(precompute)):
        cur_sim = 1 - distance.cosine(user_embedding, precompute[i])
        if (cur_sim > max_sim):
            max_sim = cur_sim
            id = i

    #print(csv_content_by_row[id])
    # Convert the CSV content to a string representation for the query
    system_message = f"You are a mentor-matching assistant. I will provide you a description of my academic interests, career goals, and/or hobbies. You will match me with the mentor" + ", ".join(csv_content_by_row[id]) + " who is most compatible with me."

    # Prepare and send the payload to the OpenAI API using the new client method
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_text}
        ]
    )

    # Check for successful response and return it
    if response:
        return jsonify(response.choices[0].message.content)
    else:
        return jsonify({"error": "Failed to get a response from OpenAI API"})

if __name__ == "__main__":
    precompute = generate_embeddings(csv_content_by_row)
    app.run(host='0.0.0.0', port=5000, debug=True)
