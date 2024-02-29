import openai
from scipy.spatial import distance
import csv
import os
import pickle  # Import pickle module

# Assuming csv_file_path and mentor_data are defined earlier in the script
csv_file_path = 'output.csv'  # Ensure you have defined this variable
mentor_data = []
precomputed_embeddings = {}

client = openai.OpenAI(api_key='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')

with open(csv_file_path, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        mentor_data.append(row)
        mentor_name = row['Name']  # Use 'Name' as the ID
        row_bio = row['Bio']
        embedding = client.embeddings.create(input=[row_bio], model="text-embedding-3-small").data[0].embedding
        precomputed_embeddings[mentor_name] = embedding

# Once all embeddings have been computed, serialize and save the embeddings dictionary using pickle
pickle_file_path = 'precomputed_embeddings.pkl'  # Define the path where you want to store the pickle file
with open(pickle_file_path, 'wb') as pickle_file:
    pickle.dump(precomputed_embeddings, pickle_file)

print("done")  # Print "done" to indicate the completion of the process

