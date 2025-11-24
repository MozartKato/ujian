import ApiService from '../services/api.service.js';

export function createAuthStore() {
  return {
    // State
    user: null,
    isAuthenticated: false,
    isLoading: true,

    // Methods
    async init() {
      await this.checkAuth();
    },

    async checkAuth() {
      this.isLoading = true;
      try {
        const user = await ApiService.getCurrentUser();
        this.user = user;
        this.isAuthenticated = true;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
      } finally {
        this.isLoading = false;
      }
    },

    async login(email, password) {
      try {
        const response = await ApiService.login({ email, password });
        this.user = response.user;
        this.isAuthenticated = true;
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message || 'Login failed' };
      }
    },

    async register(data) {
      try {
        const response = await ApiService.register(data);
        this.user = response.user;
        this.isAuthenticated = true;
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message || 'Registration failed' };
      }
    },

    async logout() {
      try {
        await ApiService.logout();
        this.user = null;
        this.isAuthenticated = false;
        // Redirect to home
        window.location.href = '/';
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };
}
