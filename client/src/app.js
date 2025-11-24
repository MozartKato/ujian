const API_URL = 'http://localhost:3000/api';

function examApp() {
  return {
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
      duration: 30,
      totalQuestions: 5,
      level: '',
    },

    get currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },

    formatQuestionCount(count) {
      if (count > 10000) {
        return '10000+ soal tersedia';
      }
      return `${count} soal tersedia`;
    },

    renderMath(text) {
      if (!text) return '';
      
      // Replace inline math $...$ and display math $$...$$
      let html = text;
      
      // Process display math first ($$...$$)
      html = html.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
        try {
          return katex.renderToString(math, { displayMode: true, throwOnError: false });
        } catch (e) {
          return match;
        }
      });
      
      // Process inline math ($...$)
      html = html.replace(/\$([^$]+)\$/g, (match, math) => {
        try {
          return katex.renderToString(math, { displayMode: false, throwOnError: false });
        } catch (e) {
          return match;
        }
      });
      
      return html;
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
      if (!this.selectedSubjectId) {
        alert('Silakan pilih mata pelajaran terlebih dahulu!');
        return;
      }

      // Find selected subject
      this.selectedSubject = this.subjects.find(s => s.id === this.selectedSubjectId);
      if (!this.selectedSubject) {
        alert('Mata pelajaran tidak ditemukan!');
        return;
      }

      this.loading = true;
      try {
        // Load questions first to check availability
        let url = `${API_URL}/questions/subject/${this.selectedSubject.id}`;
        if (this.config.level) {
          url += `?level=${this.config.level}`;
        }
        const questionsRes = await fetch(url);
        const allQuestions = await questionsRes.json();

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

        // Random sample sesuai config
        this.questions = this.shuffleArray(allQuestions).slice(
          0,
          this.config.totalQuestions
        );

        // Shuffle answers for each question
        this.questions = this.questions.map(q => ({
          ...q,
          answers: this.shuffleArray(q.answers)
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
      this.selectedSubjectId = '';
      this.showConfigForm = false;
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
