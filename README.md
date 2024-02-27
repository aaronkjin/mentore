# Mentore

An LLM-integrated mentor-matching platform. Designed to connect individuals with the perfect mentor tailored to their unique needs, preferences, and aspirations. Offers personalized mentorship connections that can help propel your personal and professional growth.

## Getting Started

To see the website up and running, go into the frontend directory, and run:

```bash
# run
npm start
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

- JavaScript
- HTML/CSS
- React
- Client-side data fetching and state management with React hooks

### Data Handling and AI

- Precomputed embeddings using OpenAI's embedding models
- RESTful API endpoints for querying and response handling
- Cosine similarity for mentor matching logic
- GPT-4 for generating mentor matches based on user queries

## Sprint 2 Updates

### Aaron

**This sprint:** Regarding our initial idea (PharmD), our group and I decided to engage in extensive market research within the retail pharmacy space. To do so, we paired up (Andrew + me, Daniel + Sarvesh) and interviewed 15+ local retail pharmacies in order to needfind and see whether there was a market need for the product we envisioned. After some deliberation (along with external hurdles), we decided as a group that it was best for us to pivot our idea to something more tangible and within our grasp given the scope and length of this class.

For our pivot, we ideated on building an AI-powered mentor-matching platform. All of us realized that, despite coming to Stanford, we had to pave our own journeys to discover steps that would best align with our academics and career goals; if we were able to chat with mentors, we could have had more seamless, fluid journeys.

Specifically, for this sprint, I, alongside Sarvesh in our code-pairing sessions, built the frontend application from the ground up (using Next.js as our boilerplate) and enhanced the UI of our mentor-matching platform. We focused on implementing the key UI features that would be crucial for our app. Each component was meticulously crafted to ensure seamless functionality in the near future (by the next sprint) and aesthetic coherence with the app's theme. Currently, our frontend is built as sort of a mock-up in the sense that the user's text input is sent to the backend and is successfully queried but does not show conversational output yet. I will continue to work on that in the next sprint (see details below for my goals for the next sprint).

**Next sprint:** For the next sprint, I will build out the interface for chat displays between the user and our chatbot. I am taking inspiration, in terms of design, from OpenAI's ChatGPT as well as various other newer chatbot interfaces: Perplexity and Phind, for instance. I will also focus on building a responsive and robust authentication system by integrating Google Auth for user convenience. Thus, my main tickets for next sprint are building out the chat UI so that users can see and respond to the chatbot's outputs as well as integrating an authentication system.

### Daniel

**This sprint:** I refactored the existing backend for our previous idea (PharmD). Specifically, I precompute embeddings for all our mentor data that I import from a .csv file using the OpenAI embeddings API. Then, I take the user query and compute the embedding for it in the same manner and I find the precomputed embedding with the highest cosine similarity to try to match the mentor. Finally, I use the text generation API for the chatbot conversation with the user that suggests the mentor with the highest embedding cosine similarity. I also worked on integrating requests to the webpoint from the frontend.

**Next sprint:** The results for mentor-matching are very subpar. For instance, if I ask for a mentor that specializes in AI, machine learning, and app-building with LLMs, the suggested mentor is Bob Ross (???). I will aim to redesign the embeddings and similarity calculations to see if I can improve this. Furthermore, I aim to make a more robust database to create embeddings (which may fix the previous issue) and implement full chatbot functionality rather than just one user input and one chatbot response.

### Sarvesh

**This sprint:**
In our last sprint, the team made significant progress on pivoting our project towards an AI-powered mentor-matching platform, which aligns more closely with the immediate needs and opportunities we identified through our market research. I played a pivotal role in our ideation phase and worked on the frontened with Aaron. Overall, we've laid the groundwork for a platform that promises to connect students with mentors in a more meaningful and efficient way.

Last Sprint Achievements:
Conducted extensive market research within the retail pharmacy space before deciding on a pivot.
Ideated and initiated the development of an AI-powered mentor-matching platform.
Developed the frontend application from scratch, focusing on key UI features to enhance user experience with Aaron while pair programming.

**Next sprint:**
Fixing the Backend: This involves a thorough review and enhancement of our current backend infrastructure to support the increased complexity and functionality of our mentor-matching platform. Ensuring stability, scalability, and security will be key aspects of this work.
Improving Cosine Similarity Functionality: Currently, our platform is not matching kids to mentors as accurately as we intend. Sarvesh will be dedicating time to refine the algorithm, specifically focusing on the cosine similarity calculations that underpin our matching logic. This will involve:

### Andrew

**This sprint:** I did api testing through postman to facilitate the connection between the frontend and the ec2 instance server. I worked primarily on maintaining the aws pipeline and working with Dan to build the flask server. Most of my code contributions were on the ubuntu ec2 instance side and most of my debugged changes were added to commits made by Dan.

**Next sprint:** Work on getting the current code to work on the deployed app because there are current SSL issues. Improve mentor-matching with Dan to have not only LLM suggestions but also baseline category matching to ensure that the suggestions are geared towards the right direction. Start talking with customers (likely high school students) to gather interest and build a waitlist. Start to add in real mentors/tutors that start with a bunch of stanford students and ensure that the matching makes sense post database creation.

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
