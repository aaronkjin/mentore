from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client
#import pandas as pd
import openai

# Twilio credentials
account_sid = 'ACdba58ba8296599c367bb944619676d1e'
phone_sid = 'PN52523103c6a1bbe797343cb28d2419fe'
auth_token = '7bc5c66f3bcf6972dbf9733cce113ea8'
client = Client(account_sid, auth_token)

# OpenAI API Key
openai.api_key = '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'

# Flask app initialization
app = Flask(__name__)

# Load CSV data as a string (ensure the correct path is provided)
csv_file_path = 'pharmd_mock_data.csv'
with open(csv_file_path, 'r') as file:
    csv_content = file.read()

# Default message to be sent once
intro_msg = "Hi there! I am your personalized pharmacist Sunny D!"

@app.route("/sms", methods=['POST'])
def sms_reply():
    # Get the message the user sent our Twilio number
    incoming_msg = request.form.get('Body')

    # Concatenate the incoming message with the CSV content and other details for the GPT prompt
    prompt_msg = "This is Sam Altman and Will Depue, we are testing out the healthcare capabilities of this version of GPT. " \
                 "We would like you to pretend to be a pharmacist named Sunny D who has a prescription for amoxicillin for the patient that she is texting. " \
                 "The patient has responded with this message to your default greeting: " + incoming_msg + \
                 ". This is the information you have for all the prescription prices in the patient's area as a .csv file loaded as a text string: " \
                 + csv_content + " Be careful, you don't wanna get it wrong!"

    # Generate a response using OpenAI
    gpt_response = openai.Completion.create(
        engine="gpt-4",  # Use the appropriate engine for GPT-4
        prompt=prompt_msg,
        max_tokens=4096  # Adjust as needed
    )

    # Create a Twilio response
    resp = MessagingResponse()
    resp.message(gpt_response.choices[0].text.strip())

    return str(resp)

if __name__ == "__main__":
    # Send the default message once when the server starts
    message = client.messages.create(
        body=intro_msg,  # Message content
        from_='+1',  # Your Twilio number
        to='+17143184720'  # The recipient's phone number
    )

    # Start the Flask app
    app.run(debug=True)

