# Frontend for PharmD

## Introduction

This document is for the frontend portion of our online pharmacy platform. The frontend is primarily focused on handling queries from external applications and initially, it will manage a basic user interface for sending messages. This MVP phase will not include a sophisticated user interface or authentication system.

## Current Frontend Functionality

As of now, the frontend is designed to interact with users through a simple, yet sleek, chatbot user interface, powered by an open-source platform and OpenAI. Here's what it can do:

- Receive queries from users regarding choices between choosing prescriptions based on distance and price.
- Use OpenAI to process these queries.
- Respond to users with relevant information.

## Technical Set-Up

### Prerequisites

- Python 3.6 or later.
- Flask web framework.
- Node.js and npm.
- OpenAI API key.

## Installation and Set-Up

1. Install Flask: Flask is a lightweight WSGI web application framework in Python. Install it using pip:

`pip install Flask`

2. Set up Twilio: Sign up for a Twilio account and obtain your API credentials. These will be used to send and receive SMS messages.

3. OpenAI API Key: Ensure you have an OpenAI API key set up and ready to use. This is crucial for generating responses to user queries.

## Running the Application

Run the Flask application with the following command:

`flask run`

This will start a local server and enable interaction through the Twilio SMS service.

## Security and Authentication

- Stripe Integration: For handling payments, we will use Stripe's secure payment processing.

- User Authentication: In future iterations, we will integrate a robust user authentication system. For now, this is not a part of the MVP.

## Future Development

The MVP is a stepping stone towards a more feature-rich frontend. Planned features include:
- A full-fledged user interface for searching medications.
- Advanced user authentication and profile management.
- Integration with the backend for real-time access to prescription drug prices.

