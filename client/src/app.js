const API_URL = 'http://localhost:3000/api';

function examApp() {
  return {
    loading: false,
    subjects: [],
    selectedSubject: null,
    sessionId: null,
    status: null,
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    timeLeft: 0,
    timerInterval: null,
    summary: {},
    config: {
      duration: 30,
      totalQuestions: 5,
    },

    get currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },

    async init() {
      await this.loadSubjects();
    },

    async loadSubjects() {
      this.loading = true;
      try {
        const res = await fetch(`${API_URL}/subjects`);
        this.subjects = await res.json();
      } catch (err) {
        alert('Gagal memuat daftar mata pelajaran');
      } finally {
        this.loading = false;
      }
    },

    selectSubject(subject) {
      this.selectedSubject = subject;
    },

    async startExam() {
      this.loading = true;
      try {
        // Create session
        const sessionRes = await fetch(`${API_URL}/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectId: this.selectedSubject.id,
            duration: this.config.duration,
            totalQuestions: this.config.totalQuestions,
          }),
        });

        if (!sessionRes.ok) throw new Error('Gagal memulai sesi');

        const session = await sessionRes.json();
        this.sessionId = session.id;
        this.status = session.status;

        // Load questions
        const questionsRes = await fetch(
          `${API_URL}/questions/subject/${this.selectedSubject.id}`
        );
        const allQuestions = await questionsRes.json();

        // Random sample sesuai config
        this.questions = this.shuffleArray(allQuestions).slice(
          0,
          this.config.totalQuestions
        );

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

      // Auto-save ke backend
      try {
        await fetch(`${API_URL}/sessions/${this.sessionId}/answers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId, answerId }),
        });
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

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        await fetch(`${API_URL}/sessions/${this.sessionId}/finish`, {
          method: 'POST',
        });

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
        const res = await fetch(`${API_URL}/sessions/${this.sessionId}`);
        const data = await res.json();
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
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.userAnswers = {};
      this.timeLeft = 0;
      this.summary = {};
      clearInterval(this.timerInterval);
    },

    shuffleArray(array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
  };
}
