/* ======================================================
   🫀 MISI RAHASIA TUBUHKU — Dashboard Guru
   Statistik kelas, analisis indikator, tabel siswa
   ====================================================== */

const Dashboard = {
    TOTAL_STUDENTS: 28,

    /**
     * Ambil semua hasil dari localStorage
     */
    getResults() {
        return JSON.parse(localStorage.getItem('misi_rahasia_results') || '[]');
    },

    /**
     * Hitung statistik kelas
     */
    getStatistics() {
        const results = this.getResults();
        const completed = results.length;
        const notCompleted = Math.max(0, this.TOTAL_STUDENTS - completed);
        const scores = results.map(r => r.totalScore);

        const avg = scores.length
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

        const highest = scores.length ? Math.max(...scores) : 0;
        const lowest = scores.length ? Math.min(...scores) : 0;
        const passing = scores.filter(s => s >= 70).length;
        const passingPct = completed
            ? Math.round((passing / completed) * 100)
            : 0;

        return {
            totalStudents: this.TOTAL_STUDENTS,
            completed,
            notCompleted,
            avg,
            highest,
            lowest,
            passing,
            passingPct
        };
    },

    /**
     * Analisis penguasaan per indikator (rata-rata kelas)
     */
    getIndicatorAnalysis() {
        const results = this.getResults();

        return INDICATORS.map((ind, i) => {
            const avgPct = results.length
                ? Math.round(
                    results.reduce((sum, r) => {
                        const pcts = r.indicatorPercentages || [0, 0, 0, 0, 0];
                        return sum + (pcts[i] || 0);
                    }, 0) / results.length
                )
                : 0;

            return {
                id: ind.id,
                name: ind.name,
                short: ind.short,
                percentage: avgPct,
                level: avgPct >= 75 ? 'high' : avgPct >= 50 ? 'mid' : 'low'
            };
        });
    },

    /**
     * Hapus semua data hasil
     */
    clearResults() {
        localStorage.removeItem('misi_rahasia_results');
    },

    /**
     * Render HTML dashboard lengkap
     */
    render() {
        const stats = this.getStatistics();
        const results = this.getResults();
        const indicators = this.getIndicatorAnalysis();

        return `
        <div class="screen dashboard-screen">
            <div class="nav-bar" style="justify-content:center">
                <span class="title-md" style="margin:0">📊 Dashboard Guru</span>
            </div>

            <!-- Statistik Utama -->
            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-value">${stats.totalStudents}</div>
                    <div class="stat-label">Total Siswa</div>
                </div>
                <div class="stat-card green">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${stats.completed}</div>
                    <div class="stat-label">Sudah Mengerjakan</div>
                </div>
                <div class="stat-card yellow">
                    <div class="stat-icon">⏳</div>
                    <div class="stat-value">${stats.notCompleted}</div>
                    <div class="stat-label">Belum Mengerjakan</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value">${stats.avg}</div>
                    <div class="stat-label">Rata-rata Kelas</div>
                </div>
                <div class="stat-card green">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">${stats.highest}</div>
                    <div class="stat-label">Nilai Tertinggi</div>
                </div>
                <div class="stat-card purple">
                    <div class="stat-icon">📈</div>
                    <div class="stat-value">${stats.passingPct}%</div>
                    <div class="stat-label">Ketuntasan</div>
                </div>
            </div>

            <!-- Tabel Siswa -->
            <h3 class="title-md mb-16">📋 Data Hasil Siswa</h3>

            ${results.length > 0 ? `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Absen</th>
                            <th>Skor</th>
                            <th>M1</th>
                            <th>M2</th>
                            <th>M3</th>
                            <th>M4</th>
                            <th>M5</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map((r, i) => `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${this.escapeHtml(r.studentName)}</td>
                            <td>${this.escapeHtml(r.studentNumber)}</td>
                            <td><strong>${r.totalScore}</strong></td>
                            <td>${r.missionScores[0]}</td>
                            <td>${r.missionScores[1]}</td>
                            <td>${r.missionScores[2]}</td>
                            <td>${r.missionScores[3]}</td>
                            <td>${r.missionScores[4]}</td>
                            <td>
                                <span class="status-badge ${r.totalScore >= 70 ? 'status-tuntas' : 'status-belum'}">
                                    ${r.totalScore >= 70 ? '✅ Tuntas' : '⏳ Belum'}
                                </span>
                            </td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ` : `
            <div class="card text-center mb-24" style="padding:40px">
                <div style="font-size:3rem;margin-bottom:12px">📭</div>
                <p class="subtitle">Belum ada siswa yang mengerjakan.</p>
                <p class="text-muted">Data akan muncul setelah siswa menyelesaikan game.</p>
            </div>
            `}

            <!-- Analisis Indikator -->
            <h3 class="title-md mb-16 mt-16">📈 Analisis Penguasaan Indikator</h3>

            <div class="indicator-list">
                ${indicators.map((ind, i) => `
                <div class="indicator-item">
                    <div class="indicator-header">
                        <span class="indicator-name">Indikator ${i + 1} — ${ind.short}</span>
                        <span class="indicator-percentage" style="color: ${ind.level === 'high' ? 'var(--green)' : ind.level === 'mid' ? 'var(--yellow-dark)' : 'var(--red)'}">
                            ${ind.percentage}%
                        </span>
                    </div>
                    <div class="indicator-bar">
                        <div class="indicator-fill ${ind.level}" style="width: ${ind.percentage}%"></div>
                    </div>
                    <div class="text-muted" style="font-size:0.8rem;text-align:left;margin-top:4px">
                        ${ind.name}
                    </div>
                </div>
                `).join('')}
            </div>

            <!-- Rekomendasi -->
            ${results.length > 0 ? this.renderRecommendations(indicators) : ''}

            <!-- Aksi -->
            <div class="dashboard-actions mt-32">
                <button class="btn btn-secondary btn-sm" onclick="Dashboard.exportCSV()">
                    📥 Ekspor CSV
                </button>
                <button class="btn btn-outline btn-sm" onclick="Dashboard.confirmClear()">
                    🗑️ Hapus Semua Data
                </button>
            </div>
        </div>
        `;
    },

    /**
     * Render rekomendasi berdasarkan analisis indikator
     */
    renderRecommendations(indicators) {
        const weak = indicators.filter(ind => ind.percentage < 70);

        if (weak.length === 0) {
            return `
            <div class="card mt-24" style="border-left:4px solid var(--green);max-width:720px">
                <p style="font-weight:700;color:var(--green-dark)">
                    ✅ Semua indikator sudah dikuasai dengan baik oleh kelas!
                </p>
            </div>`;
        }

        return `
        <div class="card mt-24" style="border-left:4px solid var(--yellow);max-width:720px">
            <p style="font-weight:800;margin-bottom:8px;color:var(--yellow-dark)">
                💡 Rekomendasi — Materi yang Perlu Diperkuat:
            </p>
            <ul style="padding-left:20px;color:var(--text-secondary)">
                ${weak.map(w => `
                <li style="margin-bottom:6px">
                    <strong>Indikator ${w.id}:</strong> ${w.name}
                    <span style="color:var(--red);font-weight:700"> (${w.percentage}%)</span>
                </li>`).join('')}
            </ul>
        </div>`;
    },

    /**
     * Ekspor data ke CSV
     */
    exportCSV() {
        const results = this.getResults();
        if (results.length === 0) {
            alert('Belum ada data untuk diekspor.');
            return;
        }

        const headers = [
            'No', 'Nama', 'Absen', 'Kelas', 'Skor Total',
            'Misi 1', 'Misi 2', 'Misi 3', 'Misi 4', 'Misi 5',
            'Indikator 1 (%)', 'Indikator 2 (%)', 'Indikator 3 (%)',
            'Indikator 4 (%)', 'Indikator 5 (%)',
            'Status', 'Kategori', 'Waktu'
        ];

        const rows = results.map((r, i) => {
            const ip = r.indicatorPercentages || [0, 0, 0, 0, 0];
            return [
                i + 1,
                `"${r.studentName}"`,
                r.studentNumber,
                r.studentClass,
                r.totalScore,
                ...r.missionScores,
                ...ip,
                r.totalScore >= 70 ? 'Tuntas' : 'Belum Tuntas',
                `"${r.category}"`,
                `"${new Date(r.timestamp).toLocaleString('id-ID')}"`
            ].join(',');
        });

        const csv = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `hasil_misi_rahasia_tubuhku_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Konfirmasi hapus data
     */
    confirmClear() {
        if (confirm('⚠️ Yakin ingin menghapus SEMUA data hasil siswa?\n\nData yang sudah dihapus tidak bisa dikembalikan.')) {
            this.clearResults();
            App.navigateTo('dashboard');
        }
    },

    /**
     * Helper: escape HTML untuk keamanan
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }
};
