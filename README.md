#Quiz API (Take-Home Assignment)

A RESTful backend service built in **Node.js + TypeScript** to manage and execute quizzes. Users can create quizzes, fetch them, submit answers, and get results.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- In-memory storage (`Map`)
- Jest (for tests)
- Docker + Docker Compose

---

## Getting Started

### Prerequisites

- Node.js (>= 16)
- Docker & Docker Compose

---

### ⚙️ Local Development (without Docker)

1. Clone the repo:

```bash
git clone https://github.com/your-username/quiz-api.git
cd quiz-api


# Install dependencies
 npm install

# Run the app
 npm start 

#Visit the API at:
http://localhost:3000/api



API endpoints and sample curls

Create Quiz:
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

Get Quiz:
curl --location 'http://localhost:3000/api/quizzes/6cc016e3-accb-47f1-b145-c03246d5fe7c/questions/<question_id>/answer' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user123",
    "selected_option": 0
  }'


Submit Answer:
curl --location 'http://localhost:3000/api/quizzes/6cc016e3-accb-47f1-b145-c03246d5fe7c/questions/444193f8-e3d9-49bf-b5be-73609815c8ce/answer' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user123",
    "selected_option": 0
  }'

Get Results:
curl --location 'http://localhost:3000/api/quizzes/6cc016e3-accb-47f1-b145-c03246d5fe7c/results/user123'


#Run with Docker Compose


docker-compose up --build


# Run Tests
npm test


 Project Structure
src/
  ├── routes/       # API route handlers
  ├── models/       # TypeScript interfaces
  ├── data/         # In-memory database logic
  └── index.ts      # Main Express app



