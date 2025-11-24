import { API_CONFIG } from '../config/constants.js';

class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Subject endpoints
  async getSubjects() {
    return this.request(API_CONFIG.ENDPOINTS.SUBJECTS);
  }

  // Question endpoints
  async getQuestionsBySubject(subjectId, level = null) {
    let url = `${API_CONFIG.ENDPOINTS.QUESTIONS}/subject/${subjectId}`;
    if (level) {
      url += `?level=${level}`;
    }
    return this.request(url);
  }

  // Session endpoints
  async createSession(data) {
    return this.request(API_CONFIG.ENDPOINTS.SESSIONS, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    });
  }

  async getSession(sessionId) {
    return this.request(`${API_CONFIG.ENDPOINTS.SESSIONS}/${sessionId}`, {
      credentials: 'include'
    });
  }

  async finishSession(sessionId) {
    return this.request(`${API_CONFIG.ENDPOINTS.SESSIONS}/${sessionId}/finish`, {
      method: 'POST',
      credentials: 'include'
    });
  }

  async saveAnswer(sessionId, data) {
    return this.request(`${API_CONFIG.ENDPOINTS.SESSIONS}/${sessionId}/answers`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    });
  }

  // Auth endpoints
  async register(data) {
    return this.request(`${API_CONFIG.ENDPOINTS.AUTH}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    });
  }

  async login(data) {
    return this.request(`${API_CONFIG.ENDPOINTS.AUTH}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include'
    });
  }

  async logout() {
    return this.request(`${API_CONFIG.ENDPOINTS.AUTH}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  }

  async getCurrentUser() {
    return this.request(`${API_CONFIG.ENDPOINTS.AUTH}/me`, {
      credentials: 'include'
    });
  }

  // User history
  async getUserHistory() {
    return this.request(API_CONFIG.ENDPOINTS.HISTORY, {
      credentials: 'include'
    });
  }
}

export default new ApiService();
