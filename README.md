# Mentore

An LLM-integrated mentor-matching platform. Designed to connect individuals with the perfect mentor tailored to their unique needs, preferences, and aspirations. Offers personalized mentorship connections that can help propel your personal and professional growth.

## Getting Started

Install and run server:

```bash
# install dependencies
yarn

# run
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Design

### Backend

The backend is engineered to process user queries through a robust JSON interface, leveraging OpenAI embeddings and GPT-4's computation capabilities. It analyzes user input to generate a compatible mentor match, outputting the results in a structured JSON format for the frontend to consume.

### Frontend

The frontend presents a digital UI, designed for intuitive user interactions. It facilitates the input of user information, displaying tailored mentor matches with rich profiles and interactive elements, ensuring a seamless user journey from query to connection.

## Technologies Used

### Backend

- Flask (Python web framework)
- OpenAI Python library
- SciPy library (for spatial distance computations)
- CSV module (for CSV file operations)
- JSON module (for JSON parsing and response handling)

### Frontend

- TypeScript
- HTML/CSS
- Next.js (React framework)
- Client-side data fetching and state management with React hooks

### Data Handling and AI

- Precomputed embeddings using OpenAI's embedding models
- RESTful API endpoints for querying and response handling
- Cosine similarity for mentor matching logic
- GPT-4 for generating mentor matches based on user queries

## Sprint 2 Updates

### Aaron

### Daniel
This sprint: I refactored the existing backend for our previous idea (PharmD). Specifically, I precompute embeddings for all our mentor data that I import from a .csv file using the OpenAI embeddings API. Then, I take the user query and compute the embedding for it in the same manner and I find the precomputed embedding with the highest cosine similarity to try to match the mentor. Finally, I use the text generation API for the chatbot conversation with the user that suggests the mentor with the highest embedding cosine similarity. I also worked on integrating requests to the webpoint from the frontend.

Next spring: The results for mentor-matching are very subpar. For instance, if I ask for a mentor that specializes in AI, machine learning, and app-building with LLMs, the suggested mentor is Bob Ross (???). I will aim to redesign the embeddings and similarity calculations to see if I can improve this. Furthermore, I aim to make a more robust database to create embeddings (which may fix the previous issue) and implement full chatbot functionality rather than just one user input and one chatbot response.
### Sarvesh

### Andrew

## Contributing

We welcome contributions! If you're interested in helping improve Mentore, please fork the repository and submit a pull request with your proposed changes. For major changes, please open an issue first to discuss what you would like to change.

## License

Not for public release. Do not copy, do not distribute.

## Contact

For inquiries or further information, reach out to us at:

- aaronkjin@gmail.com or aaronjin@stanford.edu.
- sarveshrbabu@gmail.com or sarveshb@stanford.edu.
- dguo8412@gmail.com or danguo@stanford.edu.
- andrewchung2004@gmail.com or awchung@stanford.edu.
