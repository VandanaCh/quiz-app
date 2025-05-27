"use strict";
// src/data/store.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.results = exports.quizzes = void 0;
exports.getUserResult = getUserResult;
exports.saveUserResult = saveUserResult;
exports.quizzes = new Map();
exports.results = new Map(); // quizId -> userId -> result
function getUserResult(quizId, userId) {
    var _a;
    return (_a = exports.results.get(quizId)) === null || _a === void 0 ? void 0 : _a.get(userId);
}
function saveUserResult(quizId, userId, result) {
    if (!exports.results.has(quizId)) {
        exports.results.set(quizId, new Map());
    }
    exports.results.get(quizId).set(userId, result);
}
