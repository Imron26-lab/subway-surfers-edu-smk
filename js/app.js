/**
 * Main Application Controller - Subway Surfers Edu: SMK Budi Agung Edition
 * Mengelola Profil Siswa, Mapel, Kuis Interaktif (Mystery Box & Revive),
 * Shop Skin Karakter & Hoverboard, Leaderboard Siswa (+Export CSV), dan Panel Editor Soal Guru.
 */

class EduRunnerApp {
  constructor() {
    this.studentName = localStorage.getItem('smk_surfers_name') || 'Siswa SMK';
    this.studentClass = localStorage.getItem('smk_surfers_class') || 'XI TKJ 1';
    this.selectedCategory = localStorage.getItem('smk_surfers_category') || 'all';

    this.walletCoins = parseInt(localStorage.getItem('smk_surfers_wallet') || '250', 10);
    this.highScore = parseInt(localStorage.getItem('smk_surfers_highscore') || '0', 10);

    this.unlockedSkins = JSON.parse(localStorage.getItem('smk_surfers_unlocked_skins') || '["raka"]');
    this.unlockedBoards = JSON.parse(localStorage.getItem('smk_surfers_unlocked_boards') || '["neon"]');
    this.activeSkin = localStorage.getItem('smk_surfers_skin') || 'raka';
    this.activeBoard = localStorage.getItem('smk_surfers_board') || 'neon';
    this.upgrades = JSON.parse(localStorage.getItem('smk_surfers_upgrades') || '{"magnetLevel":0,"jetpackLevel":0,"sneakersLevel":0,"multiplierLevel":0,"boardLevel":0}');

    this.currentQuiz = null;
    this.quizType = 'bonus';
    this.quizTimer = null;
    this.quizTimeLeft = 15;
    this.quizAnswered = false;
    this.lastQuizResult = false;

    this.editingQuestionId = null;

    this.initGame3D();
    this.initUI();
    this.renderCategorySelect();
    this.updateMenuSummary();
  }

  initGame3D() {
    this.game = new window.SubwayGame3D('game-canvas-container', {
      onUpdateHUD: data => this.updateHUD(data),
      onTriggerQuiz: (type, meta) => this.openQuizModal(type, meta),
      onGameOver: summary => this.handleGameOver(summary)
    });
  }

  initUI() {
    // Input profil siswa
    const nameInput = document.getElementById('student-name-input');
    const classInput = document.getElementById('student-class-input');
    if (nameInput) {
      nameInput.value = this.studentName;
      nameInput.addEventListener('input', e => {
        this.studentName = e.target.value.trim() || 'Siswa SMK';
        localStorage.setItem('smk_surfers_name', this.studentName);
      });
    }
    if (classInput) {
      classInput.value = this.studentClass;
      classInput.addEventListener('input', e => {
        this.studentClass = e.target.value.trim() || 'XI TKJ 1';
        localStorage.setItem('smk_surfers_class', this.studentClass);
      });
    }

    // Tombol Menu Utama
    document.getElementById('btn-play-game')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      this.startGame();
    });

    document.getElementById('btn-open-shop')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      this.openShopModal();
    });

    document.getElementById('btn-open-leaderboard')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      this.openLeaderboardModal();
    });

    document.getElementById('btn-open-editor')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      this.openEditorModal();
    });

    // Tombol HUD
    document.getElementById('btn-hud-pause')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      this.togglePause();
    });

    document.getElementById('btn-hud-sound')?.addEventListener('click', () => {
      const muted = window.SoundManager?.toggleMute();
      this.updateSoundButtons(muted);
    });
    this.updateSoundButtons(window.SoundManager?.muted);

    document.getElementById('btn-hud-hoverboard')?.addEventListener('click', () => {
      this.game.activateHoverboard();
    });

    // Tombol kontrol virtual di layar (Mobile / Klik cepat)
    document.getElementById('ctrl-left')?.addEventListener('click', () => this.game.moveLane(-1));
    document.getElementById('ctrl-right')?.addEventListener('click', () => this.game.moveLane(1));
    document.getElementById('ctrl-jump')?.addEventListener('click', () => this.game.jump());
    document.getElementById('ctrl-roll')?.addEventListener('click', () => this.game.roll());
    document.getElementById('ctrl-board')?.addEventListener('click', () => this.game.activateHoverboard());

    // Tombol Pause Modal
    document.getElementById('btn-resume-game')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      document.getElementById('pause-modal').classList.add('hidden');
      this.game.resumeGame();
    });

    document.getElementById('btn-quit-to-menu')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      document.getElementById('pause-modal').classList.add('hidden');
      this.returnToMenu();
    });

    // Tombol Lanjut setelah menjawab kuis
    document.getElementById('btn-quiz-continue')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      this.closeQuizAndContinue();
    });

    // Tombol Game Over Modal
    document.getElementById('btn-play-again')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      document.getElementById('gameover-modal').classList.add('hidden');
      this.startGame();
    });

    document.getElementById('btn-gameover-menu')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      document.getElementById('gameover-modal').classList.add('hidden');
      this.returnToMenu();
    });

    // Tutup Modal
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.SoundManager?.playClick();
        const target = btn.getAttribute('data-close-modal');
        document.getElementById(target)?.classList.add('hidden');
      });
    });

    // Leaderboard Actions
    document.getElementById('btn-export-csv')?.addEventListener('click', () => {
      window.SoundManager?.playClick();
      this.exportLeaderboardCSV();
    });

    document.getElementById('btn-clear-leaderboard')?.addEventListener('click', () => {
      if (confirm('Hapus seluruh data riwayat Leaderboard siswa?')) {
        localStorage.removeItem('smk_surfers_leaderboard');
        this.renderLeaderboardTable();
      }
    });

    document.getElementById('leaderboard-filter-cat')?.addEventListener('change', () => {
      this.renderLeaderboardTable();
    });

    // Editor Soal Guru Actions
    document.getElementById('question-form')?.addEventListener('submit', e => {
      e.preventDefault();
      this.saveQuestionFromForm();
    });

    document.getElementById('btn-cancel-edit')?.addEventListener('click', () => {
      this.resetQuestionForm();
    });

    document.getElementById('editor-filter-cat')?.addEventListener('change', () => {
      this.renderEditorQuestionList();
    });

    document.getElementById('btn-add-category')?.addEventListener('click', () => {
      this.promptNewCategory();
    });

    document.getElementById('btn-export-questions')?.addEventListener('click', () => {
      this.exportQuestionsJSON();
    });

    document.getElementById('input-import-questions')?.addEventListener('change', e => {
      this.importQuestionsJSON(e);
    });

    document.getElementById('btn-reset-questions')?.addEventListener('click', () => {
      if (confirm('Kembalikan bank soal ke 64 soal bawaan Produktif SMK (Informatika/RPL/TKJ)?')) {
        window.QuestionManager.resetToDefault();
        this.renderCategorySelect();
        this.renderEditorQuestionList();
        this.updateMenuSummary();
      }
    });

    // Shortcut keyboard saat modal Kuis terbuka (1-4 atau A-D, dan Enter/Space untuk lanjut)
    window.addEventListener('keydown', e => {
      const quizModal = document.getElementById('quiz-modal');
      if (quizModal && !quizModal.classList.contains('hidden')) {
        if (!this.quizAnswered) {
          const keyMap = {
            Digit1: 0, KeyA: 0,
            Digit2: 1, KeyB: 1,
            Digit3: 2, KeyC: 2,
            Digit4: 3, KeyD: 3
          };
          if (keyMap[e.code] !== undefined) {
            e.preventDefault();
            this.submitQuizAnswer(keyMap[e.code]);
          }
        } else if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          this.closeQuizAndContinue();
        }
      } else if (e.code === 'Escape' && this.game.state === 'RUNNING') {
        this.togglePause();
      }
    });
  }

  updateSoundButtons(muted) {
    const btn = document.getElementById('btn-hud-sound');
    if (btn) {
      btn.textContent = muted ? '🔇' : '🔊';
      btn.title = muted ? 'Suara Mati (Klik untuk Nyalakan)' : 'Suara Menyala';
    }
  }

  renderCategorySelect() {
    const categories = window.QuestionManager.getCategories();
    const grid = document.getElementById('mapel-cards-grid');
    if (grid) {
      grid.innerHTML = '';
      categories.forEach(cat => {
        const count = window.QuestionManager.getQuestions(cat.id).length;
        const active = this.selectedCategory === cat.id;
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `mapel-card ${active ? 'active' : ''}`;
        card.style.setProperty('--mapel-color', cat.color || '#3b82f6');
        card.innerHTML = `
          <div class="mapel-card-icon">${cat.icon || '📘'}</div>
          <div class="mapel-card-info">
            <div class="mapel-card-title">${cat.name}</div>
            <div class="mapel-card-meta">${count} Soal Tersedia</div>
          </div>
          ${active ? '<span class="mapel-badge-check">✔</span>' : ''}
        `;
        card.addEventListener('click', () => {
          window.SoundManager?.playClick();
          this.selectedCategory = cat.id;
          localStorage.setItem('smk_surfers_category', cat.id);
          this.renderCategorySelect();
          this.updateMenuSummary();
        });
        grid.appendChild(card);
      });
    }

    // Update dropdown di Editor & Leaderboard
    const editorCatSelect = document.getElementById('q-category-input');
    const editorFilterSelect = document.getElementById('editor-filter-cat');
    const lbFilterSelect = document.getElementById('leaderboard-filter-cat');

    if (editorCatSelect) {
      editorCatSelect.innerHTML = categories
        .filter(c => c.id !== 'all')
        .map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`)
        .join('');
    }

    if (editorFilterSelect) {
      editorFilterSelect.innerHTML = categories
        .map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`)
        .join('');
    }

    if (lbFilterSelect) {
      lbFilterSelect.innerHTML = `<option value="all">Semua Mapel</option>` +
        categories
          .filter(c => c.id !== 'all')
          .map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`)
          .join('');
    }
  }

  updateMenuSummary() {
    document.getElementById('menu-wallet-coins').textContent = this.walletCoins.toLocaleString('id-ID');
    document.getElementById('menu-highscore').textContent = this.highScore.toLocaleString('id-ID');

    const skinObj = window.CHARACTER_SKINS.find(s => s.id === this.activeSkin) || window.CHARACTER_SKINS[0];
    const boardObj = window.HOVERBOARD_SKINS.find(b => b.id === this.activeBoard) || window.HOVERBOARD_SKINS[0];
    const catName = window.QuestionManager.getCategoryName(this.selectedCategory);

    const activeSkinEl = document.getElementById('menu-active-skin');
    if (activeSkinEl) activeSkinEl.textContent = `${skinObj.name} + ${boardObj.name}`;

    const activeMapelEl = document.getElementById('hud-mapel-badge');
    if (activeMapelEl) activeMapelEl.textContent = catName;
  }

  startGame() {
    const nameInput = document.getElementById('student-name-input');
    const classInput = document.getElementById('student-class-input');
    if (nameInput && nameInput.value.trim()) {
      this.studentName = nameInput.value.trim();
      localStorage.setItem('smk_surfers_name', this.studentName);
    }
    if (classInput && classInput.value.trim()) {
      this.studentClass = classInput.value.trim();
      localStorage.setItem('smk_surfers_class', this.studentClass);
    }

    document.getElementById('main-menu-overlay').classList.add('hidden');
    document.getElementById('gameover-modal').classList.add('hidden');
    document.getElementById('game-hud').classList.remove('hidden');

    this.updateMenuSummary();
    this.game.startNewGame();
  }

  returnToMenu() {
    this.game.state = 'MENU';
    window.SoundManager?.stopBgm();
    document.getElementById('game-hud').classList.add('hidden');
    document.getElementById('main-menu-overlay').classList.remove('hidden');
    this.game.buildPlayer();
    this.updateMenuSummary();
  }

  togglePause() {
    const pauseModal = document.getElementById('pause-modal');
    if (this.game.state === 'RUNNING') {
      this.game.pauseGame();
      pauseModal.classList.remove('hidden');
    } else if (this.game.state === 'PAUSED') {
      pauseModal.classList.add('hidden');
      this.game.resumeGame();
    }
  }

  updateHUD(data) {
    document.getElementById('hud-score').textContent = data.score.toLocaleString('id-ID');
    document.getElementById('hud-coins').textContent = data.coins.toLocaleString('id-ID');
    document.getElementById('hud-distance').textContent = `${data.distance}m`;
    document.getElementById('hud-multiplier').textContent = `x${data.multiplier}`;
    document.getElementById('hud-quiz-stat').textContent = `${data.quizCorrect}/${data.quizTotal}`;

    // Status tombol Hoverboard
    const hbBtn = document.getElementById('btn-hud-hoverboard');
    const hbLabel = document.getElementById('hud-hoverboard-status');
    if (hbBtn && hbLabel) {
      if (data.hoverboardActive) {
        hbBtn.className = 'hud-board-btn active';
        hbLabel.textContent = `AKTIF (${Math.ceil(data.hoverboardTimer)}s)`;
      } else if (data.hoverboardCooldown > 0) {
        hbBtn.className = 'hud-board-btn cooldown';
        hbLabel.textContent = `isi ulang ${Math.ceil(data.hoverboardCooldown)}s`;
      } else {
        hbBtn.className = 'hud-board-btn ready';
        hbLabel.textContent = 'SIAP (H)';
      }
    }

    // Power-up pills
    const container = document.getElementById('hud-powerups-bar');
    if (container) {
      const icons = {
        magnet: { label: '🧲 Magnet', color: '#ef4444' },
        jetpack: { label: '🚀 Jetpack', color: '#f97316' },
        sneakers: { label: '👟 Super Jump', color: '#22c55e' },
        multiplier: { label: '⭐ 2x Skor', color: '#38bdf8' }
      };
      let html = '';
      if (data.invincibleTimer > 0) {
        html += `<div class="powerup-pill" style="--p-color:#38bdf8">🛡️ Perisai ${Math.ceil(data.invincibleTimer)}s</div>`;
      }
      Object.keys(data.powerups).forEach(k => {
        const val = data.powerups[k];
        if (val > 0) {
          const info = icons[k];
          html += `<div class="powerup-pill" style="--p-color:${info.color}">${info.label} ${Math.ceil(val)}s</div>`;
        }
      });
      container.innerHTML = html;
    }

    // Radar Peringatan Tiang Pit Stop Kuis di Depan (Muncul sejak jarak 75m agar siswa bersiap & tidak kaget!)
    const radarEl = document.getElementById('hud-pitstop-radar');
    const radarLabel = document.getElementById('pitstop-radar-label');
    const radarDist = document.getElementById('pitstop-radar-dist');
    const radarFill = document.getElementById('pitstop-progress-fill');

    if (radarEl && radarLabel && radarDist && radarFill) {
      const dist = data.pitStopDistance;
      if (dist !== null && dist !== undefined && dist <= 75) {
        radarEl.classList.remove('hidden');
        radarDist.textContent = `${dist}m`;
        const pct = Math.min(100, Math.max(8, ((75 - dist) / 75) * 100));
        radarFill.style.width = `${pct}%`;

        if (dist <= 16) {
          radarEl.classList.add('imminent');
          radarLabel.textContent = 'BERSIAP MASUK ZONA PIT STOP KUIS...';
        } else {
          radarEl.classList.remove('imminent');
          radarLabel.textContent = 'TIANG PIT STOP KUIS DI DEPAN';
        }
      } else {
        radarEl.classList.add('hidden');
        radarEl.classList.remove('imminent');
      }
    }
  }

  // ======================== MODAL KUIS INTERAKTIF ========================
  openQuizModal(type, meta = {}) {
    this.quizType = type;
    this.quizAnswered = false;
    this.currentQuiz = window.QuestionManager.getRandomQuestion(this.selectedCategory);

    const modal = document.getElementById('quiz-modal');
    const headerBanner = document.getElementById('quiz-type-banner');
    const subtitleEl = document.getElementById('quiz-type-subtitle');
    const catBadge = document.getElementById('quiz-category-badge');
    const questionText = document.getElementById('quiz-question-text');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const feedbackBox = document.getElementById('quiz-feedback-box');

    feedbackBox.classList.add('hidden');

    if (type === 'bonus') {
      headerBanner.className = 'quiz-banner bonus';
      headerBanner.innerHTML = '🏁 PIT STOP KUIS BONUS!';
      subtitleEl.textContent = 'Jawab benar di Pit Stop ini untuk +100 Koin, +500 Skor & 1 Power-Up Acak!';
    } else {
      headerBanner.className = 'quiz-banner revive';
      headerBanner.innerHTML = `🚨 TERTANGKAP! KUIS PENYELAMAT (${(meta.reviveCount || 0) + 1}/${meta.maxRevives || 3})`;
      subtitleEl.textContent = 'Jawab benar agar diselamatkan dengan Perisai Pelindung & lanjut berlari!';
    }

    catBadge.textContent = window.QuestionManager.getCategoryName(this.currentQuiz.category);
    questionText.textContent = this.currentQuiz.question;

    const letters = ['A', 'B', 'C', 'D'];
    optionsGrid.innerHTML = '';
    this.currentQuiz.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="opt-letter">${letters[idx]}</span>
        <span class="opt-text">${this.escapeHtml(optText)}</span>
      `;
      btn.addEventListener('click', () => this.submitQuizAnswer(idx));
      optionsGrid.appendChild(btn);
    });

    modal.classList.remove('hidden');

    // Mulai countdown timer 15 detik
    this.quizTimeLeft = 15;
    this.updateQuizTimerUI();
    if (this.quizTimer) clearInterval(this.quizTimer);

    this.quizTimer = setInterval(() => {
      this.quizTimeLeft -= 1;
      this.updateQuizTimerUI();
      if (this.quizTimeLeft <= 5 && this.quizTimeLeft > 0) {
        window.SoundManager?.playTick();
      }
      if (this.quizTimeLeft <= 0) {
        clearInterval(this.quizTimer);
        this.submitQuizAnswer(-1); // Waktu habis
      }
    }, 1000);
  }

  updateQuizTimerUI() {
    const numEl = document.getElementById('quiz-timer-text');
    const barEl = document.getElementById('quiz-timer-fill');
    if (numEl) numEl.textContent = `${Math.max(0, this.quizTimeLeft)}s`;
    if (barEl) {
      const pct = Math.max(0, (this.quizTimeLeft / 15) * 100);
      barEl.style.width = `${pct}%`;
      barEl.style.background = this.quizTimeLeft <= 5 ? '#ef4444' : '#22c55e';
    }
  }

  submitQuizAnswer(selectedIndex) {
    if (this.quizAnswered) return;
    this.quizAnswered = true;
    if (this.quizTimer) {
      clearInterval(this.quizTimer);
      this.quizTimer = null;
    }

    const correctIndex = this.currentQuiz.answer;
    const isCorrect = selectedIndex === correctIndex;
    this.lastQuizResult = isCorrect;

    if (isCorrect) {
      window.SoundManager?.playCorrect();
    } else {
      window.SoundManager?.playWrong();
    }

    const buttons = document.querySelectorAll('#quiz-options-grid .quiz-option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    const feedbackBox = document.getElementById('quiz-feedback-box');
    const feedbackTitle = document.getElementById('quiz-feedback-title');
    const feedbackExplain = document.getElementById('quiz-feedback-explanation');
    const continueBtn = document.getElementById('btn-quiz-continue');

    feedbackBox.classList.remove('hidden', 'feedback-ok', 'feedback-fail');
    feedbackBox.classList.add(isCorrect ? 'feedback-ok' : 'feedback-fail');

    if (isCorrect) {
      if (this.quizType === 'bonus') {
        feedbackTitle.textContent = '✅ JAWABAN BENAR! (+100 Koin, +500 Skor & Power-Up Aktif!)';
      } else {
        feedbackTitle.textContent = '✅ JAWABAN BENAR! Kamu Berhasil Lolos & Mendapat Perisai!';
      }
      continueBtn.textContent = 'LANJUT BERLARI 🚀 (Spasi)';
    } else {
      const letters = ['A', 'B', 'C', 'D'];
      const reason = selectedIndex === -1 ? '⏰ WAKTU HABIS!' : '❌ JAWABAN KURANG TEPAT!';
      feedbackTitle.textContent = `${reason} Kunci Jawaban: ${letters[correctIndex]}`;
      continueBtn.textContent = this.quizType === 'revive' ? 'LIHAT HASIL AKHIR 🏁' : 'LANJUT BERLARI ▶';
    }

    feedbackExplain.textContent = `💡 Pembahasan: ${this.currentQuiz.explanation || 'Pelajari kembali materi ini agar makin mahir!'}`;
  }

  closeQuizAndContinue() {
    document.getElementById('quiz-modal').classList.add('hidden');
    this.game.resolveQuizResult(this.quizType, this.lastQuizResult);
  }

  // ======================== GAME OVER & LEADERBOARD ========================
  handleGameOver(summary) {
    // Tambahkan koin ke dompet siswa
    this.walletCoins += summary.coins;
    localStorage.setItem('smk_surfers_wallet', String(this.walletCoins));

    const isNewRecord = summary.score > this.highScore;
    if (isNewRecord) {
      this.highScore = summary.score;
      localStorage.setItem('smk_surfers_highscore', String(this.highScore));
    }

    const accuracy = summary.quizTotal > 0
      ? Math.round((summary.quizCorrect / summary.quizTotal) * 100)
      : 0;

    // Simpan ke Leaderboard
    this.saveToLeaderboard({
      name: this.studentName,
      studentClass: this.studentClass,
      category: this.selectedCategory,
      categoryName: window.QuestionManager.getCategoryName(this.selectedCategory),
      score: summary.score,
      coins: summary.coins,
      distance: summary.distance,
      quizCorrect: summary.quizCorrect,
      quizTotal: summary.quizTotal,
      accuracy,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    });

    // Tampilkan di Modal Game Over
    document.getElementById('go-student-info').textContent = `${this.studentName} • ${this.studentClass}`;
    document.getElementById('go-score').textContent = summary.score.toLocaleString('id-ID');
    document.getElementById('go-distance').textContent = `${summary.distance} m`;
    document.getElementById('go-coins').textContent = `+${summary.coins}`;
    document.getElementById('go-quiz-score').textContent = `${summary.quizCorrect} / ${summary.quizTotal} (${accuracy}%)`;

    const badgeEl = document.getElementById('go-new-record-badge');
    if (badgeEl) {
      badgeEl.classList.toggle('hidden', !isNewRecord);
    }

    document.getElementById('gameover-modal').classList.remove('hidden');
    this.updateMenuSummary();
  }

  getLeaderboardData() {
    try {
      const raw = localStorage.getItem('smk_surfers_leaderboard');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    // Data awal contoh siswa SMK Budi Agung
    return [
      {
        name: 'Rizky Pratama',
        studentClass: 'XII TKJ 1',
        category: 'tkj',
        categoryName: 'Teknik Komputer & Jaringan (TKJ)',
        score: 14850,
        coins: 420,
        distance: 1120,
        quizCorrect: 7,
        quizTotal: 7,
        accuracy: 100,
        date: '27 Nov 2026'
      },
      {
        name: 'Putri Ayu Lestari',
        studentClass: 'XI RPL 1',
        category: 'pemrograman',
        categoryName: 'Pemrograman Web & RPL',
        score: 12300,
        coins: 360,
        distance: 940,
        quizCorrect: 5,
        quizTotal: 6,
        accuracy: 83,
        date: '27 Nov 2026'
      },
      {
        name: 'Dimas Aditya',
        studentClass: 'X TKJ 2',
        category: 'informatika',
        categoryName: 'Dasar Informatika & Algoritma',
        score: 9640,
        coins: 275,
        distance: 760,
        quizCorrect: 4,
        quizTotal: 5,
        accuracy: 80,
        date: '27 Nov 2026'
      }
    ];
  }

  saveToLeaderboard(entry) {
    const list = this.getLeaderboardData();
    list.push(entry);
    list.sort((a, b) => b.score - a.score);
    const trimmed = list.slice(0, 50);
    localStorage.setItem('smk_surfers_leaderboard', JSON.stringify(trimmed));
  }

  openLeaderboardModal() {
    this.renderLeaderboardTable();
    document.getElementById('leaderboard-modal').classList.remove('hidden');
  }

  renderLeaderboardTable() {
    const filterCat = document.getElementById('leaderboard-filter-cat')?.value || 'all';
    let list = this.getLeaderboardData();
    if (filterCat !== 'all') {
      list = list.filter(item => item.category === filterCat);
    }

    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-row">Belum ada data skor siswa untuk kategori ini.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((item, idx) => {
      const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
      return `
        <tr>
          <td><strong>${medal}</strong></td>
          <td><strong>${this.escapeHtml(item.name)}</strong></td>
          <td><span class="tag-pill">${this.escapeHtml(item.studentClass)}</span></td>
          <td>${this.escapeHtml(item.categoryName || item.category)}</td>
          <td class="text-gold"><strong>${Number(item.score).toLocaleString('id-ID')}</strong></td>
          <td>${item.quizCorrect}/${item.quizTotal} <strong>(${item.accuracy}%)</strong></td>
          <td>${item.date || '-'}</td>
        </tr>
      `;
    }).join('');
  }

  exportLeaderboardCSV() {
    const list = this.getLeaderboardData();
    const headers = ['Peringkat', 'Nama Siswa', 'Kelas', 'Mata Pelajaran', 'Skor', 'Jarak (m)', 'Kuis Benar', 'Total Kuis', 'Akurasi (%)', 'Tanggal'];
    const rows = list.map((item, idx) => [
      idx + 1,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.studentClass || '').replace(/"/g, '""')}"`,
      `"${(item.categoryName || '').replace(/"/g, '""')}"`,
      item.score,
      item.distance || 0,
      item.quizCorrect,
      item.quizTotal,
      item.accuracy,
      `"${item.date || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rekap_Nilai_SubwaySurfers_SMK_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ======================== SHOP KARAKTER, HOVERBOARD & UPGRADE ========================
  openShopModal() {
    this.renderShop();
    document.getElementById('shop-modal').classList.remove('hidden');
  }

  renderShop() {
    document.getElementById('shop-wallet-coins').textContent = this.walletCoins.toLocaleString('id-ID');

    // 1. Skin Karakter
    const skinsGrid = document.getElementById('shop-skins-grid');
    if (skinsGrid) {
      skinsGrid.innerHTML = window.CHARACTER_SKINS.map(skin => {
        const unlocked = this.unlockedSkins.includes(skin.id);
        const equipped = this.activeSkin === skin.id;
        const hexShirt = '#' + skin.shirtColor.toString(16).padStart(6, '0');
        const hexCap = '#' + skin.capColor.toString(16).padStart(6, '0');

        let btnHtml = '';
        if (equipped) {
          btnHtml = `<button class="shop-btn equipped" disabled>✔ DIPAKAI</button>`;
        } else if (unlocked) {
          btnHtml = `<button class="shop-btn select" data-equip-skin="${skin.id}">PAKAI SKIN</button>`;
        } else {
          btnHtml = `<button class="shop-btn buy" data-buy-skin="${skin.id}">🪙 ${skin.price}</button>`;
        }

        return `
          <div class="shop-item-card ${equipped ? 'active' : ''}">
            <div class="skin-avatar-preview" style="background: linear-gradient(135deg, ${hexShirt}, ${hexCap})">
              <span>🏃</span>
            </div>
            <div class="shop-item-title">${skin.name}</div>
            <div class="shop-item-sub">${skin.role}</div>
            ${btnHtml}
          </div>
        `;
      }).join('');

      skinsGrid.querySelectorAll('[data-equip-skin]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.activeSkin = btn.getAttribute('data-equip-skin');
          localStorage.setItem('smk_surfers_skin', this.activeSkin);
          window.SoundManager?.playClick();
          this.game.buildPlayer();
          this.renderShop();
          this.updateMenuSummary();
        });
      });

      skinsGrid.querySelectorAll('[data-buy-skin]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-buy-skin');
          const skin = window.CHARACTER_SKINS.find(s => s.id === id);
          if (!skin) return;
          if (this.walletCoins < skin.price) {
            alert('Koin belum cukup! Kumpulkan koin sambil berlari atau jawab Mystery Box Kuis.');
            return;
          }
          this.walletCoins -= skin.price;
          localStorage.setItem('smk_surfers_wallet', String(this.walletCoins));
          this.unlockedSkins.push(id);
          localStorage.setItem('smk_surfers_unlocked_skins', JSON.stringify(this.unlockedSkins));
          this.activeSkin = id;
          localStorage.setItem('smk_surfers_skin', id);
          window.SoundManager?.playPowerup();
          this.game.buildPlayer();
          this.renderShop();
          this.updateMenuSummary();
        });
      });
    }

    // 2. Hoverboard
    const boardsGrid = document.getElementById('shop-boards-grid');
    if (boardsGrid) {
      boardsGrid.innerHTML = window.HOVERBOARD_SKINS.map(board => {
        const unlocked = this.unlockedBoards.includes(board.id);
        const equipped = this.activeBoard === board.id;
        const hexMain = '#' + board.mainColor.toString(16).padStart(6, '0');
        const hexGlow = '#' + board.glowColor.toString(16).padStart(6, '0');

        let btnHtml = '';
        if (equipped) {
          btnHtml = `<button class="shop-btn equipped" disabled>✔ DIPAKAI</button>`;
        } else if (unlocked) {
          btnHtml = `<button class="shop-btn select" data-equip-board="${board.id}">PAKAI BOARD</button>`;
        } else {
          btnHtml = `<button class="shop-btn buy" data-buy-board="${board.id}">🪙 ${board.price}</button>`;
        }

        return `
          <div class="shop-item-card ${equipped ? 'active' : ''}">
            <div class="skin-avatar-preview" style="background: linear-gradient(135deg, ${hexMain}, ${hexGlow})">
              <span>🛹</span>
            </div>
            <div class="shop-item-title">${board.name}</div>
            <div class="shop-item-sub">Pelindung Anti-Tabrak</div>
            ${btnHtml}
          </div>
        `;
      }).join('');

      boardsGrid.querySelectorAll('[data-equip-board]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.activeBoard = btn.getAttribute('data-equip-board');
          localStorage.setItem('smk_surfers_board', this.activeBoard);
          window.SoundManager?.playClick();
          this.game.buildPlayer();
          this.renderShop();
          this.updateMenuSummary();
        });
      });

      boardsGrid.querySelectorAll('[data-buy-board]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-buy-board');
          const board = window.HOVERBOARD_SKINS.find(b => b.id === id);
          if (!board) return;
          if (this.walletCoins < board.price) {
            alert('Koin belum cukup!');
            return;
          }
          this.walletCoins -= board.price;
          localStorage.setItem('smk_surfers_wallet', String(this.walletCoins));
          this.unlockedBoards.push(id);
          localStorage.setItem('smk_surfers_unlocked_boards', JSON.stringify(this.unlockedBoards));
          this.activeBoard = id;
          localStorage.setItem('smk_surfers_board', id);
          window.SoundManager?.playPowerup();
          this.game.buildPlayer();
          this.renderShop();
          this.updateMenuSummary();
        });
      });
    }

    // 3. Upgrade Power-Up
    const upgradesGrid = document.getElementById('shop-upgrades-grid');
    if (upgradesGrid) {
      const items = [
        { key: 'magnetLevel', name: '🧲 Magnet Koin', desc: '+2.5 detik durasi tarik koin' },
        { key: 'jetpackLevel', name: '🚀 Cyber Jetpack', desc: '+2.5 detik terbang bebas di udara' },
        { key: 'sneakersLevel', name: '👟 Super Sneakers', desc: '+2.5 detik lompat tinggi ke atap kereta' },
        { key: 'multiplierLevel', name: '⭐ 2x Multiplier', desc: '+2.5 detik pengganda skor' }
      ];

      upgradesGrid.innerHTML = items.map(u => {
        const lvl = this.upgrades[u.key] || 0;
        const maxLvl = 5;
        const cost = (lvl + 1) * 200;
        return `
          <div class="shop-item-card">
            <div class="shop-item-title">${u.name}</div>
            <div class="shop-item-sub">${u.desc}</div>
            <div class="upgrade-bars">
              ${[1, 2, 3, 4, 5].map(i => `<span class="u-bar ${i <= lvl ? 'filled' : ''}"></span>`).join('')}
            </div>
            ${lvl >= maxLvl
              ? `<button class="shop-btn equipped" disabled>MAX LEVEL</button>`
              : `<button class="shop-btn buy" data-buy-upgrade="${u.key}">UPGRADE (🪙 ${cost})</button>`
            }
          </div>
        `;
      }).join('');

      upgradesGrid.querySelectorAll('[data-buy-upgrade]').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-buy-upgrade');
          const lvl = this.upgrades[key] || 0;
          const cost = (lvl + 1) * 200;
          if (this.walletCoins < cost) {
            alert('Koin belum cukup untuk upgrade!');
            return;
          }
          this.walletCoins -= cost;
          localStorage.setItem('smk_surfers_wallet', String(this.walletCoins));
          this.upgrades[key] = lvl + 1;
          localStorage.setItem('smk_surfers_upgrades', JSON.stringify(this.upgrades));
          window.SoundManager?.playPowerup();
          this.renderShop();
          this.updateMenuSummary();
        });
      });
    }
  }

  // ======================== PANEL EDITOR SOAL GURU ========================
  openEditorModal() {
    this.resetQuestionForm();
    this.renderEditorQuestionList();
    document.getElementById('editor-modal').classList.remove('hidden');
  }

  renderEditorQuestionList() {
    const filterCat = document.getElementById('editor-filter-cat')?.value || 'all';
    const list = window.QuestionManager.getQuestions(filterCat);
    const container = document.getElementById('editor-questions-list');
    const countBadge = document.getElementById('editor-total-count');

    if (countBadge) countBadge.textContent = `${list.length} Soal`;
    if (!container) return;

    const letters = ['A', 'B', 'C', 'D'];
    container.innerHTML = list.map((q, idx) => `
      <div class="editor-q-card">
        <div class="editor-q-header">
          <span class="tag-pill">${this.escapeHtml(window.QuestionManager.getCategoryName(q.category))}</span>
          <div class="editor-q-actions">
            <button type="button" class="btn-mini edit" data-edit-q="${q.id}">✏️ Edit</button>
            <button type="button" class="btn-mini delete" data-del-q="${q.id}">🗑️ Hapus</button>
          </div>
        </div>
        <div class="editor-q-title">${idx + 1}. ${this.escapeHtml(q.question)}</div>
        <div class="editor-q-opts">
          ${q.options.map((opt, oIdx) => `
            <span class="editor-opt-pill ${oIdx === q.answer ? 'correct' : ''}">
              <strong>${letters[oIdx]}.</strong> ${this.escapeHtml(opt)}
            </span>
          `).join('')}
        </div>
        <div class="editor-q-exp">💡 ${this.escapeHtml(q.explanation || '-')}</div>
      </div>
    `).join('');

    container.querySelectorAll('[data-edit-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-q');
        this.loadQuestionIntoForm(id);
      });
    });

    container.querySelectorAll('[data-del-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-q');
        if (confirm('Hapus soal ini dari bank soal?')) {
          window.QuestionManager.deleteQuestion(id);
          this.renderEditorQuestionList();
          this.renderCategorySelect();
        }
      });
    });
  }

  loadQuestionIntoForm(id) {
    const q = window.QuestionManager.getQuestions('all').find(item => item.id === id);
    if (!q) return;
    this.editingQuestionId = q.id;

    document.getElementById('form-mode-title').textContent = '✏️ Edit Soal Kuis';
    document.getElementById('q-category-input').value = q.category;
    document.getElementById('q-text-input').value = q.question;
    document.getElementById('q-opt-0').value = q.options[0] || '';
    document.getElementById('q-opt-1').value = q.options[1] || '';
    document.getElementById('q-opt-2').value = q.options[2] || '';
    document.getElementById('q-opt-3').value = q.options[3] || '';
    document.getElementById('q-answer-input').value = String(q.answer);
    document.getElementById('q-explanation-input').value = q.explanation || '';
    document.getElementById('btn-cancel-edit').classList.remove('hidden');
  }

  resetQuestionForm() {
    this.editingQuestionId = null;
    document.getElementById('form-mode-title').textContent = '➕ Tambah Soal Baru';
    document.getElementById('question-form')?.reset();
    document.getElementById('btn-cancel-edit')?.classList.add('hidden');
  }

  saveQuestionFromForm() {
    const category = document.getElementById('q-category-input').value;
    const question = document.getElementById('q-text-input').value.trim();
    const options = [
      document.getElementById('q-opt-0').value.trim(),
      document.getElementById('q-opt-1').value.trim(),
      document.getElementById('q-opt-2').value.trim(),
      document.getElementById('q-opt-3').value.trim()
    ];
    const answer = parseInt(document.getElementById('q-answer-input').value, 10);
    const explanation = document.getElementById('q-explanation-input').value.trim();

    if (!question || options.some(o => !o)) {
      alert('Mohon lengkapi teks pertanyaan dan keempat pilihan jawaban (A, B, C, D).');
      return;
    }

    if (this.editingQuestionId) {
      window.QuestionManager.updateQuestion(this.editingQuestionId, {
        category, question, options, answer, explanation
      });
    } else {
      window.QuestionManager.addQuestion({
        category, question, options, answer, explanation
      });
    }

    window.SoundManager?.playCorrect();
    this.resetQuestionForm();
    this.renderEditorQuestionList();
    this.renderCategorySelect();
  }

  promptNewCategory() {
    const name = prompt('Masukkan Nama Mata Pelajaran / Topik Baru (contoh: Desain Grafis DKV / IoT & Robotika):');
    if (!name || !name.trim()) return;
    const icon = prompt('Masukkan Emoji Ikon Mapel (contoh: 🎨, 🤖, 📡, 📐):', '📘') || '📘';
    window.QuestionManager.addCategory(name.trim(), icon.trim());
    this.renderCategorySelect();
  }

  exportQuestionsJSON() {
    const json = window.QuestionManager.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bank_Soal_SMK_SubwaySurfers_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importQuestionsJSON(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const count = window.QuestionManager.importJSON(e.target.result);
        alert(`Berhasil mengimpor ${count} soal ke dalam game!`);
        this.renderCategorySelect();
        this.renderEditorQuestionList();
      } catch (err) {
        alert('Gagal mengimpor file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new EduRunnerApp();
});
