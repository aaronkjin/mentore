# PharmD

![pharmd](https://github.com/sarveshrbabu/pharm/assets/58490258/ecb27bb5-af1f-4693-a420-b7ed2b1ca4d1)

## Project Overview

This platform is a comprehensive online pharmacy system designed to provide users with an efficient and user-friendly way to search for prescription drugs based on their specific needs. The application is divided into three main components:

- **Frontend**: Handles queries from an external application and displays a user interface for searching medications based on prescriptions. It also manages user authentication. Our MVP is likely to just send out a Twilio SMS - no user interface/auth just yet. Just use Stripe for payment authentication if we accept payment directly on our platform.
- **Backend**: A robust database containing comprehensive information on prescription drug prices, covering various areas and aggregating data from multiple online sources and pharmacies.
- **Cache**: Regularly updates the backend database with the latest drug prices found across the internet and from all known pharmacies in a given area. This component ensures that the database has recent and sufficient data for each query.

## Getting Started

[Instructions on setting up and running the project locally, including installing dependencies.]

Once we develop something being able to run some of it locally and providing instructions here might be useful. We could also just have readmes for each branch because each branch will be hosted differently. Check the deployment section to see the outline of how we will begin to handle that.

I mean this is a live repository so once we figure out live deployment shit like AWS/Heroku etc, it won't matter. It might be useful to keep a list of dependencies or versions we are developing on here maybe? Eh just open a new readme for every branch and also keep track of it there. Just don't be a dipshit.

## Sprint 1 Updates

### Aaron

During our initial sprint for the PharmD project, my focus was centered on validating the core issues we aim to address. Through market research, it became clear that the challenges of pricing transparency and pharmacy options are genuine concerns in the current healthcare landscape. In parallel, I took on the development of our initial frontend interface, aiming for an intuitive, engaging, yet familiar user experience reminiscent of iMessage interactions. This effort was complemented by collaborating with Sarvesh on a Twilio SMS bot, envisioned as an early user interface for patient-pharmacy communications. While this initial attempt required reevaluation, it provided valuable insights. Additionally, I contributed to laying the architectural foundation of our platform, integrating crucial data about pharmacies, prescriptions, and user preferences, and aligning these with our GPT response mechanism.

As we transition into Sprint 2, my objective is to further refine the frontend UI, infusing it with distinctive elements that align with PharmD's identity. The goal is to create an interface that is not just functional but also resonates with our target audience. Building on our foundational market research, I plan to delve deeper into understanding the patient's perspective, balancing the insights we have gathered from other stakeholders like physicians and pharmacies. This comprehensive approach will guide the enhancement of our services. In collaboration with Sarvesh, I will also focus on continuously improving our platform’s architecture, ensuring it is robust and adaptable to evolving user needs and market dynamics.

### Daniel

Sprint 1: I focussed mainly on developing the webscraper and conducting market research. For the webscraper, I initially had a version that scraped static web data using the Python package 'beautifulsoup' but I soon realized that it wasn't working for our purposes of gathering prescription drug prices across different pharmacies. As a result, I coded up a second version of the webscraper that uses the 'sellenium' package so that I could use a driver that ensured the correct location/ZIP code was inputted. It took a ton of trial and error, but in the end I completed a fully functional webscraper that gathers a list of pharmacy names, retail prices, and discounted prices of a selected drug. For market research, I set up a meeting with the Chief Medical Officer at Stanford Health Care to need-find and validate our idea. I have also been reaching out to retail pharmacists to schedule interviews to figure out how to become a pharmacy.

Sprint 2: I aim to improve upon my webscraper and build a data cache that can store all the gathered prescription information. I also aim to conduct more interviews with retail pharmacists to further understand the prescription pipeline. If we have time, I also want to get started on contributing to the frontend using React Native.

### Sarvesh

During our first sprint for the PharmD project, my responsibilities were overall system design, data acquisition for insurance coverage, and building out the core chatbot API. For the system design in collaboration with our group mates, I helped come up with the discussions on how we would split the work, and how to compartmentalize the data and workflow, and with Andrew worked on the devops for the application. 

I also worked on researching the open standards for insurance coverage queries for accessing that data as we would want that as an advantage over competitors. I'm currently in the process of reaching out to all the largest insurance companies in America to get access to such APIs eventually when we operate as a pharmacy. Andrew helped with some of the iteration on what our pain points were here. 

Then finally on building out the core chatbot API, I built out the API for all of our queries to GPT4 that incorporates the data from the Google sheet database backend and it's all hosted on an AWS EC2 micro instance. For the core chatbot API, Aaron and I also worked on getting a Twilio service up and running, which we have all the code running for so that patients can choose whether to use our frontend service or just talk via their sms numbers to get their prescription. 

For the next sprint: The hope is to get embeddings working so I can figure out what the most important context based on the query is so I don't have to worry about regex stuff. Also, figure out how to move from our spreadsheet to an actual database. Finally, I want to collaborate with Dan on splitting up the scraper cache into smaller development pieces - as that's likely to be the most technically difficult part of our project. Maybe the embeddings might be pretty technically difficult too tho. 


### Andrew

Sprint 1: This sprint I did market research to ensure that our virtual pharmacy idea was a real problem. I then worked with Dan on the web scrapper that I built within the ec2 instance and assisted Sarvesh and Aaron with the dev ops and front end. I also integrated the scrapper with google sheets.

Sprint 2: Next sprint I hope to deploy the scrapper on a server, help build out the full backend and deploy to heroku. We also want to make sure that our product is useful and start recruiting real users. 

## Repository Structure

### /frontend - Frontend application code

### /backend - Backend services and database integration

### /cache - Cache mechanism for updating drug prices

### /docs - Project documentation

### /tests - Testing scripts and resources

## Branching Strategy - GitHub Flow

We use GitHub Flow for collaborative development. It's straightforward and effective, ensuring code integrity and quality.

1. **Main Branch**:
   - The `main` branch contains production-ready code.
   - Direct commits to `main` are prohibited to maintain code quality.
2. **Feature Branches**:
   - Create new branches from `main` for each feature or bug fix.
   - Use descriptive names for branches (e.g., `feature/user-authentication`, `bugfix/price-update-error`).
3. **Pull Requests**:
   - After completing development in a branch, create a pull request to merge it into `main`.
   - PRs must be reviewed and approved by at least one team member.
   - Delete branches post-merge to maintain a clean repository.

## Issue Tracking

We utilize GitHub Issues to manage tasks, bugs, and feature requests.

1. **Creating Issues**:
   - Clearly title and describe each issue.
   - Apply relevant labels (e.g., `bug`, `enhancement`).
   - Assign issues to appropriate milestones as needed.

## Milestones

Milestones help track progress towards significant goals or version releases.

1. **Creating a Milestone**:
   - Go to "Issues" > "Milestones" > "New Milestone".
   - Provide a name, due date, and description for the milestone.
   - Assign relevant issues to the milestone.

## Continuous Integration and Testing

We don't have a basic feature set or test cases set up yet.

### Setting Up GitHub Actions

- Create a `.github/workflows` directory in your repository.
- Inside this directory, add YAML files for different CI workflows such as `frontend-ci.yml`, `backend-ci.yml`, and `cache-ci.yml`.

### Frontend CI Workflow

- **Trigger:** Run on every pull request or push to the `main` branch when changes occur in the `/frontend` directory.
- **Steps:**
  - Set up the runtime environment (e.g., Node.js for React/Vue frontend).
  - Install dependencies.
  - Run linters for code quality checks.
  - Execute unit tests (using frameworks like Jest or Mocha).

### Backend CI Workflow

- **Trigger:** Run on every pull request or push to the `main` branch when changes occur in the `/backend` directory.
- **Steps:**
  - Set up the runtime environment (e.g., Python/Java/Node.js).
  - Install dependencies.
  - Run linters and static analysis tools.
  - Execute unit and integration tests (using frameworks like pytest for Python, JUnit for Java, etc.).

### Cache CI Workflow

- **Trigger:** Run on changes to the cache component.
- **Steps:**
  - Set up necessary environments (dependent on your caching mechanism implementation).
  - Run tests specific to caching mechanisms.

### Automated Testing

- Implement automated tests for each component.
- Unit tests should cover individual functions and components.
- Integration tests should assess interactions between components (e.g., frontend to backend).

### Code Coverage

- Integrate a code coverage tool to ensure substantial code coverage by tests.

## Continuous Deployment

We don't have a basic feature set or test cases set up yet or even hosting up yet for deployment via AWS. But obviously, once we have that setup on AWS/Heroku note the below.

### CD Workflow

- Set up a deployment process post successful CI runs.
- May include deployment to a staging environment followed by production.

### Environment Setup

- Define different environments in your CD pipeline (e.g., development, staging, production).

### Deployment Steps

- Include steps to build the application.
- Deploy the build to a server or hosting platform (e.g., AWS, Heroku).
- Run post-deployment scripts or database migrations.

### Additional Considerations that I don't know

- **Secrets Management:** Utilize GitHub Secrets for sensitive information required in CI/CD processes. Like SSH keys, GPT 4 API key, etc.
- **Branch Protection:** Ensure the `main` branch is protected and requires CI checks to pass before merging. This is really important don't be a dipshit.
- **Docker Integration:** Consider using Docker to containerize your application for consistency across environments. (Eh.. I don't think it will matter that much unless we write the cache in Java or sum. Ideally, we write the cache in C++ and avoid python and java as much as possible.)
- **Monitoring and Alerts:** Set up monitoring for the CI/CD pipeline for prompt identification and response to failures. This is important.

## Contributing

For information on making contributions, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Not for public release. Do not copy, do not distribute.

## Contact

- sarveshrbabu@gmail.com or sarveshb@stanford.edu
- aaronkjin@gmail.com or aaronjin@stanford.edu
- dguo8412@gmail.com or danguo@stanford.edu
- andrewchung2004@gmail.com or awchung@stanford.edu
