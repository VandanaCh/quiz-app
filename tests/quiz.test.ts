import request from 'supertest';
import app from '../src/app';

jest.mock('../src/utils/logger', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

describe('Quiz API', () => {
  let quizId: string;
  let questionId: string;

  it('should create a new quiz', async () => {
    const res = await request(app).post('/api/quizzes').send({
      title: 'Unit Test Quiz',
      questions: [
        {
          text: '2 + 2 = ?',
          options: ['3', '4', '5', '6'],
          correct_option: 1,
        },
      ],
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    quizId = res.body.id;
  });

  it('should fetch the created quiz', async () => {
    const res = await request(app).get(`/api/quizzes/${quizId}`);
    expect(res.status).toBe(200);
    expect(res.body.questions.length).toBe(1);
    questionId = res.body.questions[0].id;
  });

  it('should submit a correct answer and return feedback', async () => {
    const res = await request(app)
      .post(`/api/quizzes/${quizId}/questions/${questionId}/answer`)
      .send({ userId: 'user123', selected_option: 1 });

    expect(res.status).toBe(200);
    expect(res.body.correct).toBe(true);
  });

  it('should return the user result', async () => {
    const res = await request(app).get(`/api/quizzes/${quizId}/results/user123`);
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(1);
  });
  it('should return 404 for invalid quiz ID', async () => {
    const res = await request(app).get('/api/quizzes/invalid-id');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
  
  it('should fail to create quiz with missing fields', async () => {
    const res = await request(app).post('/api/quizzes').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid/i);
  });
  
  it('should return error for invalid answer input', async () => {
    const res = await request(app)
      .post(`/api/quizzes/${quizId}/questions/${questionId}/answer`)
      .send({ userId: '', selected_option: 'bad-value' });
  
    expect(res.status).toBe(400);
  });

  // Additional negative tests can also access quizId/questionId here
});
//Negative Test ases 

