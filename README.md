#  Quiz API (Take-Home Assignment)

A RESTful backend service built in **Node.js + TypeScript** to manage and execute quizzes.  
Users can create quizzes, fetch them, submit answers, and view results.

---

##  Tech Stack

- Node.js
- Express.js
- TypeScript
- In-memory storage (`Map`)
- Jest (for tests)
- Docker + Docker Compose

---

##  Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker & Docker Compose

---

###  Local Development (without Docker)

```bash
git clone https://github.com/VandanaCh/quiz-app.git
cd quiz-app

# Install dependencies
npm install

# Start the server
npm start


#Run with Docker Compose

docker compose up --build

# API Endpoints & Sample cURL Commands for testing 

#Create Quiz
curl --location 'http://localhost:3000/api/quizzes' \
--header 'Content-Type: application/json' \
--data '{
  "title": "JavaScript Basics",
  "questions": [
    {
      "text": "What is the output of typeof null?",
      "options": ["object", "null", "undefined", "function"],
      "correct_option": 0
    },
    {
      "text": "Which method converts JSON string to object?",
      "options": ["JSON.stringify", "JSON.parse", "JSON.objectify", "parseJSON"],
      "correct_option": 1
    }
  ]
}'

#Get Quiz 

curl --location 'http://localhost:3000/api/quizzes/<quiz_id>'


#Submit Answer

curl --location 'http://localhost:3000/api/quizzes/<quiz_id>/questions/<question_id>/answer' \
--header 'Content-Type: application/json' \
--data '{
  "userId": "user123",
  "selected_option": 0
}'


#Get Results

curl --location 'http://localhost:3000/api/quizzes/<quiz_id>/results/user123'


#Run Tests

npm test


#Project Structure

src/
  ├── routes/       # API route handlers
  ├── models/       # TypeScript interfaces
  ├── data/         # In-memory data store
  └── index.ts      # Entry point (Express app)

#Known Issues / Limitations

Uses in-memory storage — data is lost when the app restarts.

No authentication or user accounts.

Minimal input validation (can be extended).

No pagination/filtering for quizzes or answers.



#Notes
Docker setup tested and works with Node 18+.

Project does not mention Madison Logic per assignment rules.