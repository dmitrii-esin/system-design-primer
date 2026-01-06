// System Design Mastery - Learning Portal Application
// Main JavaScript Application

class LearningPortal {
  constructor() {
    this.currentView = 'home';
    this.currentLesson = null;
    this.currentQuizIndex = 0;
    this.progress = this.loadProgress();
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.renderNavigation();
    this.updateProgressDisplay();
    this.checkUrlHash();
  }

  cacheElements() {
    // Views
    this.views = {
      home: document.getElementById('homeView'),
      lesson: document.getElementById('lessonView'),
      exercise: document.getElementById('exerciseView'),
      quiz: document.getElementById('quizView'),
      progress: document.getElementById('progressView')
    };

    // Navigation
    this.sidebar = document.getElementById('sidebar');
    this.navMenu = document.getElementById('navMenu');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.sidebarToggle = document.getElementById('sidebarToggle');

    // Progress elements
    this.overallProgress = document.getElementById('overallProgress');
    this.progressText = document.getElementById('progressText');
    this.progressCircle = document.getElementById('progressCircle');
    this.progressValue = document.getElementById('progressValue');

    // Buttons
    this.startLearningBtn = document.getElementById('startLearning');
    this.viewProgressBtn = document.getElementById('viewProgress');
    this.backToNavBtn = document.getElementById('backToNav');
    this.backFromExerciseBtn = document.getElementById('backFromExercise');
    this.prevLessonBtn = document.getElementById('prevLesson');
    this.nextLessonBtn = document.getElementById('nextLesson');
    this.markCompleteBtn = document.getElementById('markComplete');
    this.resetProgressBtn = document.getElementById('resetProgress');

    // Quiz elements
    this.showAnswerBtn = document.getElementById('showAnswer');
    this.nextQuestionBtn = document.getElementById('nextQuestion');
    this.quizQuestion = document.getElementById('quizQuestion');
    this.quizAnswer = document.getElementById('quizAnswer');
    this.quizProgress = document.getElementById('quizProgress');
    this.quizTitle = document.getElementById('quizTitle');

    // Content areas
    this.lessonContent = document.getElementById('lessonContent');
    this.exerciseContent = document.getElementById('exerciseContent');
    this.exerciseTitle = document.getElementById('exerciseTitle');
    this.lessonWeek = document.getElementById('lessonWeek');
    this.lessonStatus = document.getElementById('lessonStatus');

    // Toast container
    this.toastContainer = document.getElementById('toastContainer');
  }

  bindEvents() {
    // Navigation
    this.mobileMenuBtn?.addEventListener('click', () => this.toggleSidebar());
    this.sidebarToggle?.addEventListener('click', () => this.toggleSidebar());

    // Home actions
    this.startLearningBtn?.addEventListener('click', () => this.startLearning());
    this.viewProgressBtn?.addEventListener('click', () => this.showView('progress'));

    // Lesson navigation
    this.backToNavBtn?.addEventListener('click', () => this.showView('home'));
    this.backFromExerciseBtn?.addEventListener('click', () => this.showLesson(this.currentLesson));
    this.prevLessonBtn?.addEventListener('click', () => this.navigateLesson(-1));
    this.nextLessonBtn?.addEventListener('click', () => this.navigateLesson(1));
    this.markCompleteBtn?.addEventListener('click', () => this.toggleLessonComplete());

    // Quiz
    this.showAnswerBtn?.addEventListener('click', () => this.showQuizAnswer());
    this.nextQuestionBtn?.addEventListener('click', () => this.nextQuizQuestion());

    // Progress
    this.resetProgressBtn?.addEventListener('click', () => this.resetProgress());

    // Handle hash changes
    window.addEventListener('hashchange', () => this.checkUrlHash());

    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && 
          this.sidebar.classList.contains('open') && 
          !this.sidebar.contains(e.target) && 
          !this.mobileMenuBtn.contains(e.target)) {
        this.sidebar.classList.remove('open');
      }
    });
  }

  // Progress Management
  loadProgress() {
    const saved = localStorage.getItem('systemDesignProgress');
    return saved ? JSON.parse(saved) : {
      completedLessons: [],
      completedExercises: [],
      lastVisited: null,
      streak: 0,
      lastStudyDate: null
    };
  }

  saveProgress() {
    localStorage.setItem('systemDesignProgress', JSON.stringify(this.progress));
    this.updateProgressDisplay();
    this.renderNavigation();
  }

  updateProgressDisplay() {
    const total = LESSONS.length;
    const completed = this.progress.completedLessons.length;
    const percentage = Math.round((completed / total) * 100);

    // Sidebar progress bar
    if (this.overallProgress) {
      this.overallProgress.style.width = `${percentage}%`;
    }
    if (this.progressText) {
      this.progressText.textContent = `${percentage}% Complete`;
    }

    // Progress view
    if (this.progressValue) {
      this.progressValue.textContent = `${percentage}%`;
    }
    if (this.progressCircle) {
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (percentage / 100) * circumference;
      this.progressCircle.style.strokeDashoffset = offset;
    }

    // Stats
    const lessonsCompleted = document.getElementById('lessonsCompleted');
    const exercisesDone = document.getElementById('exercisesDone');
    const studyStreak = document.getElementById('studyStreak');

    if (lessonsCompleted) {
      lessonsCompleted.textContent = `${completed} / ${total}`;
    }
    if (exercisesDone) {
      exercisesDone.textContent = this.progress.completedExercises.length;
    }
    if (studyStreak) {
      studyStreak.textContent = `${this.progress.streak} days`;
    }

    // Week grid in progress view
    this.renderWeekGrid();
  }

  renderWeekGrid() {
    const weekGrid = document.getElementById('weekGrid');
    if (!weekGrid) return;

    weekGrid.innerHTML = LESSONS.map(lesson => {
      const isCompleted = this.progress.completedLessons.includes(lesson.id);
      return `
        <div class="week-card ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}">
          <div class="week-card-header">
            <h4>Week ${lesson.week}: ${lesson.title}</h4>
            <span class="week-card-status">${isCompleted ? '✅' : '⬜'}</span>
          </div>
          <div class="week-card-progress">
            <div class="week-card-progress-fill" style="width: ${isCompleted ? '100%' : '0%'}"></div>
          </div>
        </div>
      `;
    }).join('');

    // Add click handlers
    weekGrid.querySelectorAll('.week-card').forEach(card => {
      card.addEventListener('click', () => {
        const lessonId = card.dataset.lessonId;
        this.showLesson(lessonId);
      });
    });
  }

  resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      this.progress = {
        completedLessons: [],
        completedExercises: [],
        lastVisited: null,
        streak: 0,
        lastStudyDate: null
      };
      this.saveProgress();
      this.showToast('Progress reset successfully');
    }
  }

  // Navigation
  renderNavigation() {
    if (!this.navMenu) return;

    const phases = ['Foundation', 'Intermediate', 'Advanced'];
    
    let html = '';
    
    // Home nav item
    html += `
      <div class="nav-item ${this.currentView === 'home' ? 'active' : ''}" data-view="home">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">Home</span>
      </div>
    `;

    phases.forEach(phase => {
      const phaseLesson = LESSONS.filter(l => l.phase === phase);
      if (phaseLesson.length === 0) return;

      html += `<div class="nav-section">
        <div class="nav-section-title">${phase}</div>
      </div>`;

      phaseLesson.forEach(lesson => {
        const isCompleted = this.progress.completedLessons.includes(lesson.id);
        const isActive = this.currentLesson === lesson.id;
        
        html += `
          <div class="nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}">
            <span class="nav-icon">${isCompleted ? '✅' : '📚'}</span>
            <span class="nav-label">Week ${lesson.week}</span>
            <span class="nav-badge ${isCompleted ? 'completed' : ''}">${isCompleted ? 'Done' : lesson.duration}</span>
          </div>
        `;
      });
    });

    // Progress nav item
    html += `
      <div class="nav-section">
        <div class="nav-section-title">Your Journey</div>
      </div>
      <div class="nav-item ${this.currentView === 'progress' ? 'active' : ''}" data-view="progress">
        <span class="nav-icon">📊</span>
        <span class="nav-label">Progress</span>
      </div>
    `;

    this.navMenu.innerHTML = html;

    // Add click handlers
    this.navMenu.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const lessonId = item.dataset.lessonId;
        const view = item.dataset.view;
        
        if (lessonId) {
          this.showLesson(lessonId);
        } else if (view) {
          this.showView(view);
        }
        
        // Close mobile menu
        if (window.innerWidth <= 1024) {
          this.sidebar.classList.remove('open');
        }
      });
    });
  }

  toggleSidebar() {
    this.sidebar.classList.toggle('open');
  }

  // View Management
  showView(viewName) {
    // Hide all views
    Object.values(this.views).forEach(view => {
      if (view) view.classList.remove('active');
    });

    // Show requested view
    if (this.views[viewName]) {
      this.views[viewName].classList.add('active');
    }

    this.currentView = viewName;
    
    // Update navigation
    this.renderNavigation();

    // Update URL
    if (viewName === 'home') {
      history.pushState(null, '', window.location.pathname);
    } else if (viewName === 'progress') {
      history.pushState(null, '', '#progress');
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  checkUrlHash() {
    const hash = window.location.hash.slice(1);
    
    if (hash === 'progress') {
      this.showView('progress');
    } else if (hash.startsWith('week')) {
      const weekNum = parseInt(hash.replace('week', ''));
      const lesson = LESSONS.find(l => l.week === weekNum);
      if (lesson) {
        this.showLesson(lesson.id);
      }
    } else if (!hash) {
      this.showView('home');
    }
  }

  // Lesson Management
  startLearning() {
    // Find first incomplete lesson or start from beginning
    const nextLesson = LESSONS.find(l => !this.progress.completedLessons.includes(l.id)) || LESSONS[0];
    this.showLesson(nextLesson.id);
  }

  showLesson(lessonId) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;

    this.currentLesson = lessonId;
    this.progress.lastVisited = lessonId;
    this.saveProgress();

    // Update lesson view
    this.lessonContent.innerHTML = lesson.content;
    this.lessonWeek.textContent = `Week ${lesson.week}: ${lesson.title}`;
    
    const isCompleted = this.progress.completedLessons.includes(lessonId);
    this.lessonStatus.textContent = isCompleted ? 'Completed' : 'In Progress';
    this.lessonStatus.className = `lesson-status ${isCompleted ? 'completed' : ''}`;

    // Update mark complete button
    this.markCompleteBtn.innerHTML = isCompleted 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Completed`
      : `Mark as Complete <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;

    // Update navigation buttons
    const currentIndex = LESSONS.findIndex(l => l.id === lessonId);
    this.prevLessonBtn.disabled = currentIndex === 0;
    this.nextLessonBtn.disabled = currentIndex === LESSONS.length - 1;

    // Add exercises section
    this.addExercisesSection(lesson);

    // Add quiz section
    this.addQuizSection(lesson);

    // Initialize collapsibles
    this.initCollapsibles();

    // Show lesson view
    this.showView('lesson');
    
    // Update URL
    history.pushState(null, '', `#week${lesson.week}`);
  }

  addExercisesSection(lesson) {
    if (!lesson.exercises || lesson.exercises.length === 0) return;

    // Store lesson reference for exercises
    this.currentLessonData = lesson;

    const exercisesHtml = `
      <div class="exercise-section">
        <h3>🎯 Practical Exercises</h3>
        ${lesson.exercises.map((ex, index) => `
          <div class="exercise-item">
            <h4>${ex.title}</h4>
            <p>${ex.description}</p>
            <button class="btn btn-secondary exercise-btn" data-exercise-index="${index}">
              Start Exercise
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        `).join('')}
      </div>
    `;

    this.lessonContent.innerHTML += exercisesHtml;

    // Use event delegation for exercise buttons
    const self = this;
    this.lessonContent.querySelectorAll('.exercise-btn').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const index = parseInt(this.dataset.exerciseIndex);
        self.showExercise(self.currentLessonData, index);
      };
    });
  }

  addQuizSection(lesson) {
    if (!lesson.quiz || lesson.quiz.length === 0) return;

    const quizHtml = `
      <div class="exercise-section">
        <h3>📝 Self-Quiz</h3>
        <p>Test your understanding with these questions. Try to answer without looking at the notes!</p>
        <button class="btn btn-primary" id="startQuizBtn">
          Start Quiz (${lesson.quiz.length} questions)
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;

    this.lessonContent.innerHTML += quizHtml;

    // Add click handler
    document.getElementById('startQuizBtn')?.addEventListener('click', () => {
      this.startQuiz(lesson);
    });
  }

  showExercise(lesson, exerciseIndex) {
    if (!lesson || !lesson.exercises) {
      console.error('No lesson or exercises found');
      return;
    }
    const exercise = lesson.exercises[exerciseIndex];
    if (!exercise) {
      console.error('Exercise not found at index', exerciseIndex);
      return;
    }

    // Set exercise content
    if (this.exerciseTitle) {
      this.exerciseTitle.textContent = exercise.title;
    }
    if (this.exerciseContent) {
      this.exerciseContent.innerHTML = exercise.content;
    }

    // Initialize collapsibles in exercise
    this.initCollapsibles();

    // Show exercise view
    Object.values(this.views).forEach(view => {
      if (view) view.classList.remove('active');
    });
    if (this.views.exercise) {
      this.views.exercise.classList.add('active');
    }
    this.currentView = 'exercise';
    
    // Scroll to top
    window.scrollTo(0, 0);
  }

  navigateLesson(direction) {
    const currentIndex = LESSONS.findIndex(l => l.id === this.currentLesson);
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < LESSONS.length) {
      this.showLesson(LESSONS[newIndex].id);
    }
  }

  toggleLessonComplete() {
    if (!this.currentLesson) return;

    const index = this.progress.completedLessons.indexOf(this.currentLesson);
    
    if (index === -1) {
      this.progress.completedLessons.push(this.currentLesson);
      this.showToast('🎉 Lesson marked as complete!');
      
      // Update streak
      const today = new Date().toDateString();
      if (this.progress.lastStudyDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (this.progress.lastStudyDate === yesterday) {
          this.progress.streak++;
        } else {
          this.progress.streak = 1;
        }
        this.progress.lastStudyDate = today;
      }
    } else {
      this.progress.completedLessons.splice(index, 1);
      this.showToast('Lesson marked as incomplete');
    }

    this.saveProgress();
    this.showLesson(this.currentLesson); // Refresh view
  }

  // Quiz Management
  startQuiz(lesson) {
    this.currentQuizLesson = lesson;
    this.currentQuizIndex = 0;
    
    this.quizTitle.textContent = `Week ${lesson.week} Quiz`;
    this.showQuizQuestion();
    this.showView('quiz');
  }

  showQuizQuestion() {
    const lesson = this.currentQuizLesson;
    const quiz = lesson.quiz[this.currentQuizIndex];

    this.quizProgress.textContent = `Question ${this.currentQuizIndex + 1} of ${lesson.quiz.length}`;
    this.quizQuestion.innerHTML = `<h3>${quiz.question}</h3>`;
    this.quizAnswer.innerHTML = `<strong>Answer:</strong> ${quiz.answer}`;
    this.quizAnswer.classList.add('hidden');
    
    this.showAnswerBtn.style.display = 'inline-flex';
    this.nextQuestionBtn.textContent = this.currentQuizIndex < lesson.quiz.length - 1 
      ? 'Next Question' 
      : 'Finish Quiz';
  }

  showQuizAnswer() {
    this.quizAnswer.classList.remove('hidden');
    this.showAnswerBtn.style.display = 'none';
  }

  nextQuizQuestion() {
    if (this.currentQuizIndex < this.currentQuizLesson.quiz.length - 1) {
      this.currentQuizIndex++;
      this.showQuizQuestion();
    } else {
      this.showToast('🎉 Quiz completed!');
      this.showLesson(this.currentLesson);
    }
  }

  // Collapsibles
  initCollapsibles() {
    document.querySelectorAll('.collapsible').forEach(collapsible => {
      const header = collapsible.querySelector('.collapsible-header');
      if (header && !header.hasAttribute('data-initialized')) {
        header.setAttribute('data-initialized', 'true');
        header.addEventListener('click', () => {
          collapsible.classList.toggle('open');
        });
      }
    });
  }

  // Toast Notifications
  showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.textContent = message;
    
    this.toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideIn var(--transition-normal) reverse';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new LearningPortal();
});
