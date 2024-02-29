from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from scipy.spatial import distance
import csv
import os
import pickle  # Ensure pickle is imported
import random
import openai

app = Flask(__name__)
CORS(app)

# Load OpenAI API key from environment variable
#client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

client = OpenAI(api_key='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')



#helper function hehe 
def generate_summaries(mentor_bios):
    summaries = []
    for mentor, bio in mentor_bios:
        try:
            # Adjusting the API call according to the new syntax
            response = client.chat.completions.create(
                model="gpt-4",  # or "gpt-3.5-turbo" depending on your preference
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Summarize this information in one sentence: {bio}"}
                ]
            )
            # Extracting the content from the response according to the new structure
            summary = response.choices[0].message.content
            summaries.append((mentor, summary))
        except Exception as e:
            print(f"Error generating summary: {e}")
            summaries.append("Summary not available")
    return summaries

#begin actual flask nonsense 
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

    # Initialize conversation history if not present
    if user_id not in conversations:
        conversations[user_id] = []

    # Append the user's current message to their conversation history
    conversations[user_id].append({"role": "user", "content": user_text})

    # Check if this is the first user message (excluding the current one)
    if len(conversations[user_id]) == 1:
        # It's the first message; generate top mentors list but skip GPT message generation
        storage, descriptions = generate_initial_mentor_list(user_text)
        initial_message = "Here are your 5 most likely mentors and their bios: " + "; ".join(descriptions)
        conversations[user_id].append({"role": "assistant", "content": storage})
        # Directly return the initial mentor suggestions without generating a GPT-4 response
        return jsonify({"initial_message": initial_message, "assistant_response": ""})
    else:
        # Not the first message; generate a GPT-4 response based on conversation history
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=conversations[user_id]
        )
        assistant_response = response.choices[0].message.content
        conversations[user_id].append({"role": "assistant", "content": assistant_response})
        # No need to calculate or send the initial mentor suggestions again
        return jsonify({"assistant_response": assistant_response})

def generate_initial_mentor_list(user_text):
    # Assuming precomputed_embeddings and mentor_data are already loaded
    user_embedding = client.embeddings.create(input=[user_text], model="text-embedding-3-small").data[0].embedding

    similarities = []
    for mentor_name, embedding in precomputed_embeddings.items():
        similarity = 1 - distance.cosine(user_embedding, embedding)
        similarities.append((mentor_name, similarity))

    similarities.sort(key=lambda x: x[1], reverse=True)
    top_mentors = similarities[:5]

    pairs = [(mentor_name, mentor_data.get(mentor_name, "Bio not available")) for mentor_name, _ in top_mentors]
    # Join the mentor: bio pairs into one string, separated by commas
    storage = ", ".join([f"{mentor_name}: {bio}" for mentor_name, bio in pairs])

    # Prepend the introductory sentence
    storage = "These are the mentors and their bios we recommend for you based on your input request: " + storage

    #storage = [f"{mentor_name}: {bio}" for mentor_name, bio in pairs]
   
    #summaries cus it yaps too much in the bios - todo: maybe we should precompute these just once altogether
    mentor_summaries = generate_summaries(pairs)
    descriptions = [f"{mentor}: {summary}" for mentor, summary in mentor_summaries]
    return storage, descriptions


@app.route("/disconnect", methods=['POST'])
def disconnect():
    data = request.json
    user_id = data['user_id']

    if user_id in conversations:
        del conversations[user_id]

    return jsonify({"message": "Conversation data deleted for user_id: {}".format(user_id)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

