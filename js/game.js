/* ======================================================
   🫀 MISI RAHASIA TUBUHKU — Game Engine
   State management, scoring, badges, localStorage
   ====================================================== */

const Game = {
    state: null,

    /**
     * Inisialisasi game baru dengan data siswa
     */
    init(name, number) {
        this.state = {
            studentName: name.trim(),
            studentNumber: number.trim(),
            studentClass: '3-D',
            currentMission: 0,
            currentQuestionIndex: 0,
            scores: [0, 0, 0, 0, 0],           // Skor per misi (maks 20 per misi)
            indicators: [0, 0, 0, 0, 0],        // Skor per indikator (maks 20 per indikator)
            badges: [false, false, false, false, false],
            totalScore: 0,
            completedMissions: 0,
            answers: []                          // Record setiap jawaban
        };
    },

    /**
     * Proses jawaban siswa
     * @returns {boolean} apakah jawaban benar
     */
    answerQuestion(questionId, selectedAnswer) {
        const question = QUESTIONS.find(q => q.id === questionId);
        if (!question) return false;

        const isCorrect = selectedAnswer === question.correctAnswer;

        if (isCorrect) {
            const missionIdx = question.mission - 1;
            const indicatorIdx = question.indicator - 1;
            this.state.scores[missionIdx] += question.points;
            this.state.indicators[indicatorIdx] += question.points;
            this.state.totalScore += question.points;
        }

        this.state.answers.push({
            questionId: questionId,
            mission: question.mission,
            indicator: question.indicator,
            selectedAnswer: selectedAnswer,
            correctAnswer: question.correctAnswer,
            correct: isCorrect
        });

        return isCorrect;
    },

    /**
     * Tandai misi sebagai selesai dan berikan lencana
     */
    completeMission(missionIndex) {
        if (missionIndex >= 0 && missionIndex < 5) {
            this.state.badges[missionIndex] = true;
            this.state.completedMissions = this.state.badges.filter(b => b).length;
        }
    },

    /**
     * Cek apakah misi terbuka (misi sebelumnya sudah selesai)
     */
    isMissionUnlocked(missionIndex) {
        if (missionIndex === 0) return true;
        return this.state.badges[missionIndex - 1] === true;
    },

    /**
     * Cek apakah misi sudah diselesaikan
     */
    isMissionCompleted(missionIndex) {
        return this.state.badges[missionIndex] === true;
    },

    /**
     * Cek apakah semua misi selesai
     */
    isAllCompleted() {
        return this.state.completedMissions === 5;
    },

    /**
     * Mendapatkan skor misi tertentu
     */
    getMissionScore(missionIndex) {
        return this.state.scores[missionIndex] || 0;
    },

    /**
     * Mendapatkan kategori berdasarkan skor total
     */
    getCategory() {
        const score = this.state.totalScore;
        if (score >= 90) return { name: 'ILMUWAN SUPER', icon: '🌟', cssClass: 'super' };
        if (score >= 80) return { name: 'ILMUWAN HEBAT', icon: '⭐', cssClass: 'hebat' };
        if (score >= 70) return { name: 'ILMUWAN TANGGUH', icon: '🔬', cssClass: 'tangguh' };
        return { name: 'AYO BELAJAR LAGI', icon: '💡', cssClass: 'belajar' };
    },

    /**
     * Mendapatkan persentase penguasaan per indikator
     * Setiap indikator memiliki 4 soal × 5 poin = 20 poin maks
     */
    getIndicatorPercentages() {
        const maxPerIndicator = 20;
        return this.state.indicators.map(score =>
            Math.round((score / maxPerIndicator) * 100)
        );
    },

    /**
     * Mendapatkan status ketuntasan (KKM = 70)
     */
    getCompletionStatus() {
        return this.state.totalScore >= 70 ? 'Tuntas' : 'Belum Tuntas';
    },

    /**
     * Simpan hasil ke localStorage
     */
    saveResult() {
        const results = JSON.parse(localStorage.getItem('misi_rahasia_results') || '[]');

        const result = {
            studentName: this.state.studentName,
            studentNumber: this.state.studentNumber,
            studentClass: this.state.studentClass,
            totalScore: this.state.totalScore,
            missionScores: [...this.state.scores],
            indicatorScores: [...this.state.indicators],
            indicatorPercentages: this.getIndicatorPercentages(),
            badges: [...this.state.badges],
            answers: [...this.state.answers],
            category: this.getCategory().name,
            completionStatus: this.getCompletionStatus(),
            timestamp: new Date().toISOString()
        };

        // Cek apakah siswa sudah pernah mengerjakan (berdasarkan nama + absen)
        const existingIndex = results.findIndex(
            r => r.studentName === result.studentName && r.studentNumber === result.studentNumber
        );

        if (existingIndex >= 0) {
            results[existingIndex] = result; // Update hasil yang sudah ada
        } else {
            results.push(result);
        }

        localStorage.setItem('misi_rahasia_results', JSON.stringify(results));
        return result;
    },

    /**
     * Mendapatkan data terformat untuk Google Forms (nanti)
     */
    getFormData() {
        const ip = this.getIndicatorPercentages();
        return {
            nama: this.state.studentName,
            absen: this.state.studentNumber,
            kelas: this.state.studentClass,
            skorTotal: this.state.totalScore,
            skorMisi1: this.state.scores[0],
            skorMisi2: this.state.scores[1],
            skorMisi3: this.state.scores[2],
            skorMisi4: this.state.scores[3],
            skorMisi5: this.state.scores[4],
            indikator1: ip[0] + '%',
            indikator2: ip[1] + '%',
            indikator3: ip[2] + '%',
            indikator4: ip[3] + '%',
            indikator5: ip[4] + '%',
            status: this.getCompletionStatus()
        };
    }
};
