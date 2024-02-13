from flask import Flask, request, jsonify
from openai import OpenAI
import csv
import json

# Flask app initialization
app = Flask(__name__)

# Load CSV data and convert it to a list of dictionaries
csv_file_path = 'pharmd_mock_data.csv'
csv_content_as_dicts = []
with open(csv_file_path, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        csv_content_as_dicts.append(row)

# Initialize the OpenAI client with your API key
client = OpenAI(api_key='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')

@app.route("/query", methods=['POST'])
def query_bot():
    # Read the incoming message from the JSON payload
    data = request.json
    incoming_msg = data['messageContext']

    # Convert the CSV content to a string representation for the query
    csv_content_for_query = json.dumps(csv_content_as_dicts)
    system_message = f"You are a pharmacy assistant named Sunny D with access to the following patient prescription data: {csv_content_for_query}. You only reply with JSON."

    # Prepare and send the payload to the OpenAI API using the new client method
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": incoming_msg}
        ]
    )

    # Check for successful response and return it
    if response:
        return jsonify(response.choices[0].message.content)
    else:
        return jsonify({"error": "Failed to get a response from OpenAI API"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

