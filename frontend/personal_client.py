from flask import Flask, request, jsonify
import requests
import json

# Flask app initialization
app = Flask(__name__)

# Load CSV data as a string (ensure the correct path is provided)
csv_file_path = 'pharmd_mock_data.csv'
with open(csv_file_path, 'r') as file:
    csv_content = file.read()

# Set your OpenAI API Key here
OPENAI_API_KEY = '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'
HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {OPENAI_API_KEY}'
}

@app.route("/query", methods=['POST'])
def query_bot():
    # Read the incoming message from the JSON payload
    data = request.json
    incoming_msg = data['messageContext']

    # Prepare the payload for the OpenAI API
    payload = {
        "model": "gpt-4-turbo-preview",
        "messages": [
            {
                "role": "system",
                "content": "You are an assistant, and you only reply with JSON."
            },
            {
                "role": "user",
                "content": incoming_msg
            }
        ],
        "response_format": {
            "type": "json_object"
        }
    }

    # Make the POST request to the OpenAI API
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=HEADERS, data=json.dumps(payload))

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to get a response from OpenAI API", "status_code": response.status_code})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

