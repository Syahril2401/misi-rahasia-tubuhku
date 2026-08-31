/* ======================================================
   🫀 MISI RAHASIA TUBUHKU — Main App Controller
   Screen rendering, navigation, event handling
   ====================================================== */

const App = {
    // ======== NAVIGATION ========

    navigateTo(screen, data = {}) {
        const app = document.getElementById('app');
        app.classList.add('transitioning');

        setTimeout(() => {
            switch (screen) {
                case 'splash':      app.innerHTML = this.renderSplash(); break;
                case 'identity':    app.innerHTML = this.renderIdentity(); break;
                case 'map':         app.innerHTML = this.renderMap(); break;
                case 'mission-intro': app.innerHTML = this.renderMissionIntro(data.mission); break;
                case 'question':    app.innerHTML = this.renderQuestion(data.mission, data.qIndex); break;
                case 'badge':       app.innerHTML = this.renderBadge(data.mission); break;
                case 'result':      app.innerHTML = this.renderResult(); break;
                case 'closing':     app.innerHTML = this.renderClosing(); break;
                case 'dashboard':   app.innerHTML = Dashboard.render(); break;
            }
            app.classList.remove('transitioning');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 350);
    },

    init() {
        this.navigateTo('splash');
    },

    // ======== SPLASH SCREEN ========

    renderSplash() {
        return `
        <div class="screen splash-screen">
            ${this.renderFloatingElements()}
            <div class="splash-hero">
                <div class="splash-icon">🫀</div>
                <h1 class="title-jumbo title-gradient">MISI RAHASIA<br>TUBUHKU</h1>
                <p class="subtitle">"Petualangan Menjadi Ilmuwan Cilik"</p>
                <p class="splash-tagline">Kenali Tubuhku • Pahami Keajaibannya • Jaga Kesehatannya</p>

                <div class="splash-character">🧒🔬</div>

                <button class="btn btn-primary" onclick="App.navigateTo('identity')" style="font-size:1.4rem;padding:18px 48px">
                    ▶ MULAI MISI
                </button>

                <p class="splash-hint mt-16">
                    "Siapkan dirimu untuk menemukan keajaiban tubuh manusia!"
                </p>

                <div class="splash-identity mt-32">
                    <p><strong>SDN Percobaan 2 Malang</strong></p>
                    <p>Kelas 3-D • IPAS • Tahun Pelajaran 2026–2027</p>
                    <p>Bab 1 — Keajaiban Tubuhku</p>
                </div>
            </div>

            <div class="splash-footer">
                <button class="nav-btn" onclick="App.navigateTo('dashboard')" style="opacity:0.6;font-size:0.8rem">
                    🔐 Dashboard Guru
                </button>
            </div>
        </div>`;
    },

    renderFloatingElements() {
        const items = ['🔬', '⭐', '🧬', '💊', '🔍', '🌡️', '📖', '🩺', '✨', '🫁'];
        return `<div class="floating-elements">
            ${items.map((item, i) => {
                const left = 5 + (i * 9.5);
                const top = 10 + ((i * 37) % 80);
                const delay = (i * 0.8).toFixed(1);
                const dur = (8 + (i % 4) * 2);
                return `<div class="float-item" style="left:${left}%;top:${top}%;animation-delay:${delay}s;animation-duration:${dur}s">${item}</div>`;
            }).join('')}
        </div>`;
    },

    // ======== IDENTITY SCREEN ========

    renderIdentity() {
        return `
        <div class="screen identity-screen">
            <div class="nav-bar">
                <button class="nav-btn" onclick="App.navigateTo('splash')">⬅ Kembali</button>
                <div></div>
            </div>

            <div class="card" style="max-width:520px">
                <div class="identity-icon">👤</div>
                <h2 class="title-lg">DATA ILMUWAN CILIK</h2>
                <p class="subtitle mb-24">Isi data dirimu untuk memulai petualangan!</p>

                <div class="form-group">
                    <label class="form-label" for="input-name">📝 Nama Lengkap</label>
                    <input type="text" id="input-name" class="form-input"
                        placeholder="Tulis nama lengkapmu..." maxlength="50" autocomplete="off">
                </div>

                <div class="form-group">
                    <label class="form-label" for="input-number">🔢 Nomor Absen</label>
                    <input type="text" id="input-number" class="form-input"
                        placeholder="Tulis nomor absenmu..." maxlength="3" autocomplete="off">
                </div>

                <div class="form-group">
                    <label class="form-label">🏫 Kelas</label>
                    <div class="form-static">3-D</div>
                </div>

                <div id="identity-error" style="color:var(--red);font-weight:700;text-align:center;margin-bottom:12px;display:none"></div>

                <button class="btn btn-primary btn-block mt-8" onclick="App.handleIdentitySubmit()">
                    🚀 MASUK PETUALANGAN
                </button>
            </div>
        </div>`;
    },

    handleIdentitySubmit() {
        const name = document.getElementById('input-name').value.trim();
        const number = document.getElementById('input-number').value.trim();
        const errorEl = document.getElementById('identity-error');

        if (!name) {
            errorEl.textContent = '⚠️ Nama tidak boleh kosong!';
            errorEl.style.display = 'block';
            document.getElementById('input-name').focus();
            return;
        }
        if (!number) {
            errorEl.textContent = '⚠️ Nomor absen tidak boleh kosong!';
            errorEl.style.display = 'block';
            document.getElementById('input-number').focus();
            return;
        }

        Game.init(name, number);
        this.navigateTo('map');
    },

    // ======== MAP SCREEN ========

    renderMap() {
        const completedCount = Game.state ? Game.state.completedMissions : 0;
        const progressPct = (completedCount / 5) * 100;

        return `
        <div class="screen">
            <div class="nav-bar">
                <button class="nav-btn" onclick="App.navigateTo('splash')">🏠 Beranda</button>
                <span style="font-weight:800;font-size:0.95rem">
                    👋 Halo, ${Game.state ? Game.state.studentName.split(' ')[0] : ''}!
                </span>
                <div></div>
            </div>

            <h2 class="title-lg">🗺️ PETA PETUALANGAN</h2>
            <p class="subtitle">Selesaikan semua misi untuk menjadi Ilmuwan Cilik!</p>

            <div class="progress-container" style="max-width:720px">
                <div class="progress-label">
                    <span>🏅 MISI ${completedCount}/5</span>
                    <span>⭐ Skor: ${Game.state ? Game.state.totalScore : 0}/100</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width:${progressPct}%"></div>
                </div>
            </div>

            <div class="map-container mt-16">
                <div class="mission-path">
                    ${MISSIONS.map((m, i) => {
                        const completed = Game.isMissionCompleted(i);
                        const unlocked = Game.isMissionUnlocked(i);
                        const isCurrent = unlocked && !completed;
                        const statusClass = completed ? 'completed' : isCurrent ? 'current' : 'locked';
                        const statusIcon = completed ? '✅' : isCurrent ? '▶️' : '🔒';
                        const statusText = completed
                            ? `Selesai — ${Game.getMissionScore(i)}/20`
                            : isCurrent ? 'Siap dimulai!' : 'Terkunci';

                        return `
                        <div class="mission-node ${statusClass}"
                            onclick="${unlocked && !completed ? `App.navigateTo('mission-intro', {mission: ${m.id}})` : completed ? '' : ''}"
                            ${!unlocked ? 'title="Selesaikan misi sebelumnya dulu"' : ''}>
                            <div class="mission-icon-circle ${m.color}">
                                ${completed ? '✅' : m.icon}
                            </div>
                            <div class="mission-info">
                                <h3>Misi ${m.id}: ${m.name}</h3>
                                <p>${statusText}</p>
                            </div>
                            <div class="mission-status">${statusIcon}</div>
                        </div>`;
                    }).join('')}
                </div>
            </div>

            ${Game.isAllCompleted() ? `
            <button class="btn btn-warning mt-24" onclick="App.navigateTo('result')" style="font-size:1.3rem;padding:18px 48px">
                🎉 LIHAT HASIL AKHIR
            </button>
            ` : ''}
        </div>`;
    },

    // ======== MISSION INTRO SCREEN ========

    renderMissionIntro(missionId) {
        const mission = getMissionById(missionId);
        const questions = getQuestionsForMission(missionId);

        return `
        <div class="screen intro-screen">
            <div class="nav-bar">
                <button class="nav-btn" onclick="App.navigateTo('map')">🗺️ Peta</button>
                <div></div>
            </div>

            <div class="card intro-card">
                <span class="intro-mission-num">MISI ${mission.id}</span>
                <div class="intro-icon">${mission.icon}</div>
                <h2 class="title-lg">${mission.name.toUpperCase()}</h2>
                <p class="intro-desc">${mission.description}</p>

                <div class="intro-count mt-16 mb-24">
                    📝 ${questions.length} pertanyaan menunggumu!
                </div>

                <p class="text-muted mb-16">Jawab setiap pertanyaan dengan teliti.<br>Setiap jawaban benar bernilai 5 poin!</p>

                <button class="btn btn-primary btn-block" onclick="App.navigateTo('question', {mission: ${missionId}, qIndex: 0})">
                    🚀 MULAI MISI
                </button>
            </div>
        </div>`;
    },

    // ======== QUESTION SCREEN ========

    renderQuestion(missionId, qIndex) {
        const mission = getMissionById(missionId);
        const questions = getQuestionsForMission(missionId);
        const q = questions[qIndex];

        if (!q) {
            // Semua soal misi ini selesai
            Game.completeMission(missionId - 1);
            return this.renderBadge(missionId);
        }

        const labels = ['A', 'B', 'C', 'D'];
        const totalScore = Game.state.totalScore;
        const progressPct = Math.round(((Game.state.answers.length) / 20) * 100);

        // Type badge CSS class
        const badgeClass = {
            'multiple-choice': 'badge-pg',
            'true-false': 'badge-bs',
            'matching': 'badge-cocok',
            'situational': 'badge-situasi'
        }[q.type] || 'badge-pg';

        return `
        <div class="screen">
            <!-- Header -->
            <div class="question-header">
                <span class="mission-label">${mission.icon} Misi ${mission.id}</span>
                <span class="question-counter">Soal ${qIndex + 1} / ${questions.length}</span>
            </div>

            <!-- Score Bar -->
            <div class="score-bar">
                <span>⭐ ${totalScore}/100</span>
                <div class="progress-track">
                    <div class="progress-fill" style="width:${progressPct}%"></div>
                </div>
                <span>${progressPct}%</span>
            </div>

            <!-- Question Card -->
            <div class="card question-card">
                <span class="question-type-badge ${badgeClass}">${q.typeBadge}</span>

                ${q.scenario ? `<div class="scenario-box">${q.scenario}</div>` : ''}

                <h2 class="question-text">${q.question}</h2>

                ${q.type === 'true-false' ? `
                <div class="options-tf">
                    ${q.options.map((opt, i) => `
                    <button class="option-btn option-tf" id="opt-${i}"
                        onclick="App.handleAnswer(${q.id}, ${i}, ${missionId}, ${qIndex})">
                        ${i === 0 ? '✅' : '❌'} ${opt}
                    </button>
                    `).join('')}
                </div>
                ` : `
                <div class="options-mc">
                    ${q.options.map((opt, i) => `
                    <button class="option-btn" id="opt-${i}"
                        onclick="App.handleAnswer(${q.id}, ${i}, ${missionId}, ${qIndex})">
                        <span class="option-label">${labels[i]}</span>
                        <span class="option-text">${opt}</span>
                    </button>
                    `).join('')}
                </div>
                `}
            </div>
        </div>`;
    },

    handleAnswer(questionId, selectedAnswer, missionId, qIndex) {
        // Prevent double click
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);

        const question = QUESTIONS.find(q => q.id === questionId);
        const isCorrect = Game.answerQuestion(questionId, selectedAnswer);

        // Highlight selected answer
        const selectedBtn = document.getElementById(`opt-${selectedAnswer}`);
        if (isCorrect) {
            selectedBtn.classList.add('correct');
        } else {
            selectedBtn.classList.add('wrong');
            // Also highlight the correct answer so student learns
            const correctBtn = document.getElementById(`opt-${question.correctAnswer}`);
            if (correctBtn) {
                setTimeout(() => correctBtn.classList.add('correct'), 400);
            }
        }

        // Show feedback after a brief delay
        setTimeout(() => {
            this.showFeedback(isCorrect, question, missionId, qIndex);
        }, 900);
    },

    showFeedback(isCorrect, question, missionId, qIndex) {
        const overlay = document.createElement('div');
        overlay.className = 'feedback-overlay';
        overlay.innerHTML = `
        <div class="feedback-card">
            <span class="feedback-icon">${isCorrect ? '🎉' : '💡'}</span>
            <h3 class="feedback-title ${isCorrect ? 'correct' : 'wrong'}">
                ${isCorrect ? 'Hebat! Jawabanmu Tepat!' : 'Belum Tepat'}
            </h3>
            <p class="feedback-message">
                ${isCorrect ? question.feedbackCorrect : question.feedbackWrong}
            </p>
            <button class="btn ${isCorrect ? 'btn-primary' : 'btn-secondary'}" onclick="App.nextQuestion(${missionId}, ${qIndex})">
                ➡ Lanjut
            </button>
        </div>`;

        document.body.appendChild(overlay);

        if (isCorrect) {
            this.createMiniConfetti();
        }
    },

    nextQuestion(missionId, currentQIndex) {
        // Remove feedback overlay
        const overlay = document.querySelector('.feedback-overlay');
        if (overlay) overlay.remove();

        const questions = getQuestionsForMission(missionId);
        const nextIndex = currentQIndex + 1;

        if (nextIndex >= questions.length) {
            // Mission complete!
            Game.completeMission(missionId - 1);
            this.navigateTo('badge', { mission: missionId });
        } else {
            this.navigateTo('question', { mission: missionId, qIndex: nextIndex });
        }
    },

    // ======== BADGE SCREEN ========

    renderBadge(missionId) {
        const mission = getMissionById(missionId);
        const missionScore = Game.getMissionScore(missionId - 1);
        const maxMissionScore = 20;
        const totalScore = Game.state.totalScore;

        this.triggerConfetti();

        return `
        <div class="screen badge-screen">
            <div class="card" style="text-align:center;max-width:520px">
                <p class="subtitle">🎊 Misi ${missionId} Selesai!</p>

                <h2 class="title-lg mt-8">LENCANA DIPEROLEH!</h2>

                <div class="badge-glow">
                    <span class="badge-icon-large">${mission.badge.icon}</span>
                </div>

                <p class="badge-name">${mission.badge.name.toUpperCase()}</p>

                <div class="mission-score-summary mt-16">
                    <div class="score-stat">
                        <div class="score-stat-value">${missionScore}/${maxMissionScore}</div>
                        <div class="score-stat-label">Skor Misi</div>
                    </div>
                    <div class="score-stat">
                        <div class="score-stat-value">${totalScore}/100</div>
                        <div class="score-stat-label">Total Skor</div>
                    </div>
                    <div class="score-stat">
                        <div class="score-stat-value">${Game.state.completedMissions}/5</div>
                        <div class="score-stat-label">Misi Selesai</div>
                    </div>
                </div>

                <button class="btn btn-primary btn-block mt-24" onclick="App.navigateTo('map')">
                    🗺️ KEMBALI KE PETA
                </button>
            </div>
        </div>`;
    },

    // ======== RESULT SCREEN ========

    renderResult() {
        const s = Game.state;
        const cat = Game.getCategory();
        const ip = Game.getIndicatorPercentages();

        // Save result to localStorage
        Game.saveResult();

        return `
        <div class="screen">
            <div class="nav-bar">
                <button class="nav-btn" onclick="App.navigateTo('map')">🗺️ Peta</button>
                <div></div>
            </div>

            <div class="card result-card">
                <h2 class="title-lg">🎉 MISI SELESAI!</h2>
                <p class="subtitle">"Selamat, Ilmuwan Cilik!"</p>

                <p style="font-weight:700;font-size:1.1rem;margin:8px 0">
                    👤 ${s.studentName} — No. ${s.studentNumber}
                </p>

                <!-- Score Circle -->
                <div class="result-score-circle ${cat.cssClass}">
                    ${s.totalScore}
                    <small>/ 100</small>
                </div>

                <!-- Category -->
                <div class="result-category" style="background:${cat.cssClass === 'super' ? 'var(--yellow-bg)' : cat.cssClass === 'hebat' ? '#FFF3E0' : cat.cssClass === 'tangguh' ? 'var(--green-bg)' : 'var(--blue-bg)'}">
                    ${cat.icon} ${cat.name}
                </div>

                <!-- Badges -->
                <h3 class="title-md mt-16 mb-8">🏅 Lencana Koleksimu</h3>
                <div class="result-badges">
                    ${MISSIONS.map((m, i) => `
                    <div class="result-badge-item">
                        <span class="badge-emoji">${m.badge.icon}</span>
                        <span class="badge-label">${m.badge.name}</span>
                    </div>
                    `).join('')}
                </div>

                <!-- Mission Scores -->
                <h3 class="title-md mt-16 mb-8">📊 Skor Per Misi</h3>
                <table class="result-missions-table">
                    ${MISSIONS.map((m, i) => `
                    <tr>
                        <td>${m.icon} Misi ${m.id}: ${m.name}</td>
                        <td>${s.scores[i]}/20</td>
                    </tr>
                    `).join('')}
                </table>

                <!-- Indicator Performance -->
                <h3 class="title-md mt-16 mb-8">📈 Penguasaan Indikator</h3>
                <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
                    ${INDICATORS.map((ind, i) => {
                        const pct = ip[i];
                        const color = pct >= 75 ? 'var(--green)' : pct >= 50 ? 'var(--yellow-dark)' : 'var(--red)';
                        return `
                        <div>
                            <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:700;margin-bottom:3px">
                                <span>${ind.short}</span>
                                <span style="color:${color}">${pct}%</span>
                            </div>
                            <div class="indicator-bar">
                                <div class="indicator-fill ${pct >= 75 ? 'high' : pct >= 50 ? 'mid' : 'low'}" style="width:${pct}%"></div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>

                <div class="motivational-quote">
                    "Setiap kesalahan adalah kesempatan untuk belajar."
                </div>

                <!-- Actions -->
                <button class="btn btn-primary btn-block mt-16" onclick="App.handleSendResult()">
                    📊 KIRIM HASIL KE GURU
                </button>
                <button class="btn btn-secondary btn-block mt-8" onclick="App.navigateTo('closing')">
                    🏆 LIHAT HALAMAN PENUTUP
                </button>
            </div>
        </div>`;
    },

    handleSendResult() {
        const formData = Game.getFormData();
        const gformUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfdmRo707mNc27jF3sNfNues3wFyYdgHnmGVQana_cgA2tVGg/viewform';

        // Format rangkuman hasil untuk disalin ke clipboard
        const summaryText = `🫀 HASIL MISI RAHASIA TUBUHKU
Nama: ${formData.nama}
Absen: ${formData.absen}
Kelas: ${formData.kelas}
Skor Total: ${formData.skorTotal}/100
Status: ${formData.status}
Skor Misi: M1=${formData.skorMisi1}, M2=${formData.skorMisi2}, M3=${formData.skorMisi3}, M4=${formData.skorMisi4}, M5=${formData.skorMisi5}`;

        // Salin ke clipboard jika memungkinkan
        if (navigator.clipboard) {
            navigator.clipboard.writeText(summaryText).catch(() => {});
        }

        // Tampilkan modal konfirmasi dengan tombol menuju Google Form
        const overlay = document.createElement('div');
        overlay.className = 'feedback-overlay';
        overlay.innerHTML = `
        <div class="feedback-card" style="max-width:460px">
            <span class="feedback-icon">📊</span>
            <h3 class="feedback-title correct">Kirim Hasil ke Guru</h3>
            <p class="feedback-message">
                Hasil asesmen <strong>${App.escapeHtml(formData.nama)}</strong>:<br>
                Skor Total: <strong>${formData.skorTotal}/100</strong> (${formData.status})<br><br>
                <small class="text-muted">Data rangkuman telah disalin otomatis. Klik tombol di bawah untuk membuka Google Form.</small>
            </p>
            <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
                <a href="${gformUrl}" target="_blank" class="btn btn-primary" onclick="this.closest('.feedback-overlay').remove()">
                    📝 Buka Google Form
                </a>
                <button class="btn btn-outline btn-sm" onclick="this.closest('.feedback-overlay').remove()">
                    Batal
                </button>
            </div>
        </div>`;

        document.body.appendChild(overlay);
    },

    // ======== CLOSING SCREEN ========

    renderClosing() {
        const name = Game.state ? Game.state.studentName : '';

        this.triggerConfetti();

        return `
        <div class="screen closing-screen">
            <div class="card closing-card">
                <span class="closing-trophy">🏆</span>

                <h2 class="title-lg title-gradient">KAMU BERHASIL!</h2>

                <p class="closing-message">
                    Tubuh kita adalah anugerah yang luar biasa.<br>
                    Kenali, pahami, dan jagalah tubuhmu setiap hari.
                </p>

                <div style="font-size:1.3rem;font-weight:900;color:var(--yellow-dark);margin:20px 0">
                    ⭐ AKU ILMUWAN CILIK 3-D ⭐
                </div>

                ${name ? `<p style="font-size:1.1rem;font-weight:700">👤 ${name}</p>` : ''}

                <div class="closing-identity">
                    <p><strong>SDN Percobaan 2 Malang</strong></p>
                    <p>Kelas 3-D</p>
                    <p>Tahun Pelajaran 2026–2027</p>
                </div>

                <button class="btn btn-outline btn-block mt-24" onclick="App.navigateTo('splash')">
                    🏠 KEMBALI KE AWAL
                </button>
            </div>
        </div>`;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    },

    // ======== CONFETTI EFFECTS ========

    triggerConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';

        const colors = ['#FF5252', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#E91E63', '#00BCD4'];
        const shapes = ['50%', '0', '30%'];

        for (let i = 0; i < 60; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = (Math.random() * 100) + 'vw';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 2) + 's';
            piece.style.animationDuration = (2.5 + Math.random() * 2) + 's';
            piece.style.width = (6 + Math.random() * 8) + 'px';
            piece.style.height = (6 + Math.random() * 8) + 'px';
            piece.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(piece);
        }

        setTimeout(() => { container.innerHTML = ''; }, 5000);
    },

    createMiniConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#4CAF50', '#FFC107', '#2196F3'];

        for (let i = 0; i < 15; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = (30 + Math.random() * 40) + 'vw';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 0.5) + 's';
            piece.style.animationDuration = (1.5 + Math.random() * 1) + 's';
            piece.style.width = (4 + Math.random() * 6) + 'px';
            piece.style.height = (4 + Math.random() * 6) + 'px';
            piece.style.borderRadius = '50%';
            container.appendChild(piece);
        }

        setTimeout(() => { container.innerHTML = ''; }, 3000);
    }
};

// ======== BOOTSTRAP ========
document.addEventListener('DOMContentLoaded', () => App.init());
