import { Quiz, Result } from '../models/types';
import logger from '../utils/logger';

export const quizzes = new Map<string, Quiz>();
export const results = new Map<string, Map<string, Result>>(); // quizId -> userId -> result

export function getUserResult(quizId: string, userId: string): Result | undefined {
  logger.info(`Fetching result for user ${userId} on quiz ${quizId}`);
  return results.get(quizId)?.get(userId);
}

export function saveUserResult(quizId: string, userId: string, result: Result): void {
  logger.info(`Saving result for user ${userId} on quiz ${quizId}`);
  if (!results.has(quizId)) {
    results.set(quizId, new Map());
  }
  results.get(quizId)!.set(userId, result);
}