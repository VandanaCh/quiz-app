"use strict";
// src/routes/quiz.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// POST /quizzes - Create Quiz
router.post('/quizzes', (req, res) => {
    const { title, questions } = req.body;
    if (!title || !Array.isArray(questions)) {
        return res.status(400).json({ error: 'Invalid input: title and questions are required' });
    }
    const quizId = (0, uuid_1.v4)();
    const formattedQuestions = questions.map((q) => ({
        id: (0, uuid_1.v4)(),
        text: q.text,
        options: q.options,
        correct_option: q.correct_option,
    }));
    const newQuiz = {
        id: quizId,
        title,
        questions: formattedQuestions,
    };
    store_1.quizzes.set(quizId, newQuiz);
    res.status(201).json({ id: quizId });
});
// GET /quizzes/:id - Get Quiz (without correct answers)
router.get('/quizzes/:id', (req, res) => {
    const quiz = store_1.quizzes.get(req.params.id);
    if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
    }
    const questions = quiz.questions.map(({ id, text, options }) => ({
        id,
        text,
        options,
    }));
    res.status(200).json({ id: quiz.id, title: quiz.title, questions });
});
// POST /quizzes/:quizId/questions/:questionId/answer - Submit Answer
router.post('/quizzes/:quizId/questions/:questionId/answer', (req, res) => {
    const { userId, selected_option } = req.body;
    const { quizId, questionId } = req.params;
    if (!userId || typeof selected_option !== 'number') {
        return res.status(400).json({ error: 'Invalid input: userId and selected_option required' });
    }
    const quiz = store_1.quizzes.get(quizId);
    if (!quiz)
        return res.status(404).json({ error: 'Quiz not found' });
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question)
        return res.status(404).json({ error: 'Question not found' });
    const isCorrect = question.correct_option === selected_option;
    let result = (0, store_1.getUserResult)(quizId, userId) || {
        quiz_id: quizId,
        user_id: userId,
        score: 0,
        answers: [],
    };
    result.answers.push({
        question_id: questionId,
        selected_option,
        is_correct: isCorrect,
    });
    if (isCorrect)
        result.score += 1;
    (0, store_1.saveUserResult)(quizId, userId, result);
    res.status(200).json({
        correct: isCorrect,
        correct_option: isCorrect ? undefined : question.correct_option,
    });
});
// GET /quizzes/:quizId/results/:userId - Get Results
router.get('/quizzes/:quizId/results/:userId', (req, res) => {
    const result = (0, store_1.getUserResult)(req.params.quizId, req.params.userId);
    if (!result) {
        return res.status(404).json({ error: 'Result not found' });
    }
    res.status(200).json(result);
});
exports.default = router;
