# Mentore

An LLM-integrated mentor-matching platform. Designed to connect you with the perfect mentor tailored to your unique needs, preferences, and aspirations. Offers personalized mentorship connections that can help propel your personal and professional growth.

## Getting Started

Quick setup to get the site running:

```bash
# navigate to frontend directory
cd frontend

# run the application
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Walkthrough

### Home Page

<img width="1000" alt="mentore-home" src="https://github.com/aaronkjin/mentore/assets/58490258/3063e388-ff77-40d7-9154-fd892c29331c">

Initiate your mentor search on our Home Page, offering a clean, intuitive interface inspired by leading LLM applications. Navigation options, including mentor signup and site logo for easy home access, are provided at the top.

### Auth Page

<img width="1000" alt="mentore-auth" src="https://github.com/aaronkjin/mentore/assets/58490258/a285d2af-54f4-4230-9b93-eccacabf9bf6">

Register or log in through the Auth Page to begin interacting with the platform and access more personalized features.

### Mentor Sign-Up Page

Aspiring mentors can register via the Mentor Sign-Up Page by clicking "Become a Mentor" and entering relevant details to join our mentor database. Enjoy the Easter egg featuring Gavin Belson in the placeholder text.

### Chat Page

The Chat Page delivers a sleek, minimalistic text-based interface for users to refine their search and interact with potential mentor matches through a backend-driven chatbot leveraging OpenAI embeddings and GPT-4.

## Design

### Backend

Engineered to process user queries through a robust JSON interface, leveraging OpenAI embeddings and GPT-4's computation capabilities. Analyzes user input to generate a compatible mentor match, outputting the results in a structured JSON format for the frontend to consume.

### Frontend

Offers a digital interface with seamless user interaction, supporting information input and displaying rich mentor profiles for an efficient user journey.

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
- RESTful API endpoints (for querying and response handling)
- Cosine similarity (for mentor matching logic)
- GPT-4 (for generating mentor matches based on user queries)

### Database

- Firebase (to store mentors and auth details)

## Sprint 3 Updates

### Aaron

**This sprint:** During this sprint, we refactored our frontend code to be suitable with React + JS (using create-react-app), rather than with TypeScript (and Next.js). We did this because our group members were more comfortable with reading and writing JavaScript as opposed to TypeScript, allowing more hands to work on the frontend logic if need be. Specifically with the frontend, I implemented chatBegin states such that the initial screen showcases our "landing page" (with the "Unlock potential together" motto), and upon user search of their text query, it shows an updated page of their responses in chat format (similar to an iMessage feel). I finetuned other various frontend tweaks such as adding our own font packages, redirecting users back to the landing page upon pressing "Mentore," creating chat bubbles for the users' text inputs, and more. It's the details that matter for me.

**Next sprint:** Next sprint, I will work on completing the "Sign In / Sign Up" button so that users have a way of going through the auth system. This way, we will have unique user instances so that different users can interact and respond to our conversational agent. Other than building out the authentication, I will continue to make iterative frontend changes so that we have our finalized MVP for our final sprint.

### Daniel

**This sprint:** This sprint, I built the scraper. Initially, I built a scraper LinkedIn, but it didn't work -- LinkedIn has privacy and scraping regulations that blocked our scaper. Then, I tried to make a dynamic scraper with a headless driver to simulate a human but it also didn't work as it was too slow and inefficient. I then tried to gain access to LinkedIn's API but I soon realized it would take up to a month to authorize. As a result, I pivoted and attempted to build a scraper for [Stanford Alumni Mentoring](https://mentoring.stanford.edu/). However, for some weird reason, there was no page that displayed every alumni mentor (bad product manager). Finally, I decided to simply scrape the Faculty, Research, and Teaching Staff pages on the [Stanford Profiles Directory](https://profiles.stanford.edu/). This attempt worked with a dynamic scraper that scrolled through every department and page using a headless driver. Specifically, I parsed the names, professional titles, and bios of 7,5000+ Stanford faculty mentors into a .csv file that we then passed into the OpenAI embeddings API to precompute semantic embeddings.

**Next sprint:** Next sprint, I aim to build more scrapers for other large databases and automate the scraping (in case some directories update). I also want to create a custom database that stores all the mentor data rather than relying on a .csv file and build a RAG system to reduce the latency of our chatbot (currently ~15-30 secs). Finally, I want to contribute to further frontend enhancements.

### Sarvesh

**This sprint:** This sprint, I rebuilt the backend to add the full feature set: semantic search with the embeddings similarity, chat memory, multiple users can chat, mentor context for continued question answering etc. I built in the chat functionality - where you can chat with GPT 4 about your options in mentors. You have memory for the chat -where when you talk to the bot it remembers the previous messages within a chat to come up with future responses. It has the ability to handle concurrent users - where you can have user 1 and user 2 and user 3 concurrently using the application, but it isn't quite fast and is not yet ready for scaling. It'll be running when I can create a load balancer and scheduler essentially (maybe round robin) - or a way to batch execute the prompts that its trying to execute - at the moment it is sequential. This is fine as the front end isn't fully ready yet but we can fix that once that uath page on the front end is ready - once we can actually handle multiple users on the frontend. But technically we can handle multiple users - we have the statefuleness built into the application.

**Next sprint:** I need to build a load balancer/scheduler and a way to batch execute GPT 4 prompts. I also need to build out RAG and a web agent powered by GPT4 for better results given more diverse data on the mentors. I want to help build a dynamic scraper and a backend database with a redis cache layer to store the data for quick access etc.

### Andrew

**This sprint:** This sprint, I worked with Aaron to refactor and rebuild the entire frontend to use React and JavaScript (instead of our previous Next.js interface) because it was a lot more managable. I helped Dan with the scraper and we worked on pulling all the bios of the Stanford professors. Aaron and I worked primarily on just finishing up the frontend to work and build chat functionality with the backend API that Sarvesh was building.

**Next sprint:** Next sprint, we hope to deploy the finalized code to a server and improve our embeddings. We will also further improve our UI design and start adding more mentors and add a mentor sign up feature. Our goal is to expand our platform to as many mentors as possible to give users the biggest pool of people to choose from and thus find the best match.

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

Improving Cosine Similarity Functionality: Currently, our platform is not matching kids to mentors as accurately as we intend. I will be dedicating time to refine the algorithm, specifically focusing on the cosine similarity calculations that underpin our matching logic.

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
