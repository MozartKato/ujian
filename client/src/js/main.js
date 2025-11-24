import Alpine from 'alpinejs';
import { createExamStore } from './stores/exam.store.js';
import { createAuthStore } from './stores/auth.store.js';
import 'katex/dist/katex.min.css';

// Initialize Alpine.js
window.Alpine = Alpine;

// Register stores
Alpine.data('examApp', createExamStore);
Alpine.data('authStore', createAuthStore);

// Start Alpine
Alpine.start();
