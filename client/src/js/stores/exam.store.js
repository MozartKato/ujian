import ApiService from '../services/api.service.js';
import { EXAM_CONFIG } from '../config/constants.js';
import { renderMath, formatTime, formatQuestionCount, shuffleArray } from '../utils/helpers.js';

export function createExamStore() {
  return {
    // State
    loading: false,
    subjects: [],
    selectedSubject: null,
    selectedSubjectId: '',
    showConfigForm: false,
    sessionId: null,
    status: null,
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    timeLeft: 0,
    timerInterval: null,
    summary: {},
    config: {
      duration: EXAM_CONFIG.DEFAULT_DURATION,
      totalQuestions: EXAM_CONFIG.DEFAULT_QUESTIONS,
      level: '',
    },

    // Computed
    get currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },

    // Utils (exposed to template)
    formatQuestionCount,
    renderMath,
    formatTime,

    // Methods
    async init() {
      await this.loadSubjects();
    },

    async loadSubjects() {
      this.loading = true;
      try {
        this.subjects = await ApiService.getSubjects();
      } catch (err) {
        alert('Gagal memuat daftar mata pelajaran');
      } finally {
        this.loading = false;
      }
    },

    async startExam() {
      if (!this.selectedSubjectId) {
        alert('Silakan pilih mata pelajaran terlebih dahulu!');
        return;
      }

      this.selectedSubject = this.subjects.find(s => s.id === this.selectedSubjectId);
      if (!this.selectedSubject) {
        alert('Mata pelajaran tidak ditemukan!');
        return;
      }

      this.loading = true;
      try {
        // Load questions
        const allQuestions = await ApiService.getQuestionsBySubject(
          this.selectedSubject.id,
          this.config.level || null
        );

        // Validate question availability
        if (allQuestions.length < this.config.totalQuestions) {
          const levelText = this.config.level 
            ? `level ${this.config.level.toUpperCase()}` 
            : 'semua level';
          alert(
            `Soal tidak cukup!\n\n` +
            `Soal tersedia: ${allQuestions.length} soal (${levelText})\n` +
            `Soal diminta: ${this.config.totalQuestions} soal\n\n` +
            `Silakan kurangi jumlah soal atau pilih level yang berbeda.`
          );
          this.loading = false;
          return;
        }

        // Create session
        const session = await ApiService.createSession({
          subjectId: this.selectedSubject.id,
          duration: this.config.duration,
          totalQuestions: this.config.totalQuestions,
        });

        this.sessionId = session.id;
        this.status = session.status;

        // Random sample and shuffle
        this.questions = shuffleArray(allQuestions)
          .slice(0, this.config.totalQuestions)
          .map(q => ({
            ...q,
            answers: shuffleArray(q.answers)
          }));

        // Start timer
        this.timeLeft = this.config.duration * 60;
        this.startTimer();
      } catch (err) {
        alert('Gagal memulai ujian: ' + err.message);
      } finally {
        this.loading = false;
      }
    },

    async selectAnswer(questionId, answerId) {
      this.userAnswers[questionId] = answerId;

      try {
        await ApiService.saveAnswer(this.sessionId, { questionId, answerId });
      } catch (err) {
        console.error('Failed to save answer:', err);
      }
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },

    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },

    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeLeft--;

        if (this.timeLeft <= 0) {
          this.timeoutExam();
        }
      }, 1000);
    },

    async confirmSubmit() {
      const answered = Object.keys(this.userAnswers).length;
      const total = this.questions.length;

      if (
        answered < total &&
        !confirm(
          `Kamu baru menjawab ${answered} dari ${total} soal. Yakin ingin submit?`
        )
      ) {
        return;
      }

      await this.submitExam();
    },

    async submitExam() {
      clearInterval(this.timerInterval);
      this.loading = true;

      try {
        await ApiService.finishSession(this.sessionId);
        await this.loadSummary();
      } catch (err) {
        alert('Gagal submit ujian: ' + err.message);
      } finally {
        this.loading = false;
      }
    },

    async timeoutExam() {
      clearInterval(this.timerInterval);
      this.status = 'TIMEOUT';
      await this.loadSummary();
    },

    async loadSummary() {
      try {
        const data = await ApiService.getSession(this.sessionId);
        this.summary = data;
        this.status = 'SUBMITTED';
      } catch (err) {
        console.error('Failed to load summary:', err);
      }
    },

    resetExam() {
      this.sessionId = null;
      this.status = null;
      this.selectedSubject = null;
      this.selectedSubjectId = '';
      this.showConfigForm = false;
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.userAnswers = {};
      this.timeLeft = 0;
      this.summary = {};
      clearInterval(this.timerInterval);
    }
  };
}
