export const API_CONFIG = {
  // Gunakan proxy /api untuk development, atau env variable untuk production
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
  ENDPOINTS: {
    AUTH: '/auth',
    SUBJECTS: '/subjects',
    QUESTIONS: '/questions',
    SESSIONS: '/sessions',
    ANSWERS: '/sessions/:sessionId/answers',
    HISTORY: '/sessions/user/history'
  }
};

export const EXAM_CONFIG = {
  DEFAULT_DURATION: 30,
  DEFAULT_QUESTIONS: 5,
  MIN_QUESTIONS: 1,
  MAX_QUESTIONS: 50,
  MIN_DURATION: 1,
  MAX_DURATION: 180
};
