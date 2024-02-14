from flask import Flask, request, jsonify
from openai import OpenAI
from scipy.spatial import distance
import csv
import json

# Flask app initialization
app = Flask(__name__)

# Load CSV data and convert it to a list of dictionaries
csv_file_path = 'mentore_mock_data.csv'
csv_content_by_row = []
with open(csv_file_path, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        csv_content_as_dicts.append(row)

# Initialize the OpenAI client with your API key
client = OpenAI(api_key='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')

def generate_embeddings(data):
    embeddings = []
    for row in data:
        row_string = ', '.join(row)
        embeddings.append(client.embeddings.create(input = [row_string], model="gpt-4-turbo-preview").data[0].embedding)
    return embeddings

@app.route("/query", methods=['POST'])
def query_bot():
    precompute = generate_embeddings(csv_content_by_row)
    # Read the incoming message from the JSON payload
    data = request.json

    user_text = data['message']
    user_embedding = client.embeddings.create(input = [user_text], model="gpt-4-turbo-preview").data[0].embedding

    max_sim = 0
    id = 0
    # Find maximum cosine similarity
    for i in range(len(precompute)):
        cur_sim = distance.cosine(user_embedding, precompute[i])
        if (cur_sim > max_sim):
            max_sim = cur_sim
            id = i

    # Convert the CSV content to a string representation for the query
    system_message = f"You are a mentor-matching assistant. I will provide you a description of my academic interests, career goals, and/or hobbies. You will match me with the mentor" + csv_content_by_row[id] + " who is most compatible with me."

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
    app.run(host='0.0.0.0', port=5000, debug=True)
