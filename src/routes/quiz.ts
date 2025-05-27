import { Router, Request, Response } from 'express';
import { quizzes, getUserResult, saveUserResult } from '../data/store';
import { Quiz, Question, Result } from '../models/types';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';

const router = Router();

router.post('/quizzes', (req: Request, res: Response) => {
  logger.info('Received request to create a quiz');
  const { title, questions } = req.body;

  if (!title || !Array.isArray(questions)) {
    logger.warn('Invalid input for creating quiz');
    return res.status(400).json({ error: 'Invalid input' });
  }

  const quizId = uuidv4();
  const formattedQuestions: Question[] = questions.map((q: any): Question => ({
    id: uuidv4(),
    text: q.text,
    options: q.options,
    correct_option: q.correct_option,
  }));

  const newQuiz: Quiz = { id: quizId, title, questions: formattedQuestions };
  quizzes.set(quizId, newQuiz);

  logger.info(`Quiz created with ID: ${quizId}`);
  res.status(201).json({ id: quizId });
});

router.get('/quizzes/:id', (req: Request, res: Response) => {
  const quiz = quizzes.get(req.params.id);

  if (!quiz) {
    logger.warn(`Quiz not found with ID: ${req.params.id}`);
    return res.status(404).json({ error: 'Quiz not found' });
  }

  const questions = quiz.questions.map(({ id, text, options }) => ({ id, text, options }));
  logger.info(`Fetched quiz with ID: ${req.params.id}`);
  res.status(200).json({ id: quiz.id, title: quiz.title, questions });
});

router.post('/quizzes/:quizId/questions/:questionId/answer', (req: Request, res: Response) => {
  const { userId, selected_option } = req.body;
  const { quizId, questionId } = req.params;

  logger.info(`User ${userId} answering question ${questionId} on quiz ${quizId}`);

  if (!userId || typeof selected_option !== 'number') {
    logger.warn('Invalid input for submitting answer');
    return res.status(400).json({ error: 'Invalid input' });
  }

  const quiz = quizzes.get(quizId);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

  const question = quiz.questions.find(q => q.id === questionId);
  if (!question) return res.status(404).json({ error: 'Question not found' });

  const isCorrect = question.correct_option === selected_option;
  let result: Result = getUserResult(quizId, userId) || {
    quiz_id: quizId,
    user_id: userId,
    score: 0,
    answers: [],
  };

  result.answers.push({ question_id: questionId, selected_option, is_correct: isCorrect });
  if (isCorrect) result.score += 1;
  saveUserResult(quizId, userId, result);

  logger.info(`Answer submitted. Correct: ${isCorrect}`);
  res.status(200).json({ correct: isCorrect, correct_option: isCorrect ? undefined : question.correct_option });
});

router.get('/quizzes/:quizId/results/:userId', (req: Request, res: Response) => {
  const result = getUserResult(req.params.quizId, req.params.userId);

  if (!result) {
    logger.warn(`No result found for user ${req.params.userId} on quiz ${req.params.quizId}`);
    return res.status(404).json({ error: 'Result not found' });
  }

  logger.info(`Fetched result for user ${req.params.userId} on quiz ${req.params.quizId}`);
  res.status(200).json(result);
});

export default router;