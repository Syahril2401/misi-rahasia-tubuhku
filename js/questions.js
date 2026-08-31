/* ======================================================
   🫀 MISI RAHASIA TUBUHKU — Bank Soal
   20 Soal × 5 Misi × 5 Poin = 100 Poin Total
   ====================================================== */

const MISSIONS = [
    {
        id: 1,
        name: 'Peta Tubuhku',
        icon: '🔎',
        description: 'Mengenal bagian-bagian tubuh manusia',
        color: 'green',
        badge: { name: 'Penjelajah Tubuh', icon: '🔬' },
        indicatorId: 1
    },
    {
        id: 2,
        name: 'Pasukan Pancaindra',
        icon: '👁️',
        description: 'Mengenal alat indera dan fungsinya',
        color: 'blue',
        badge: { name: 'Detektif Pancaindra', icon: '👁️' },
        indicatorId: 2
    },
    {
        id: 3,
        name: 'Tubuhku Bekerja',
        icon: '🏃',
        description: 'Memahami fungsi bagian tubuh dalam aktivitas sehari-hari',
        color: 'yellow',
        badge: { name: 'Ahli Tubuhku', icon: '🏃' },
        indicatorId: 3
    },
    {
        id: 4,
        name: 'Detektif Kesehatan',
        icon: '🧼',
        description: 'Mengenali kebiasaan yang menjaga kesehatan tubuh',
        color: 'red',
        badge: { name: 'Penjaga Kesehatan', icon: '🛡️' },
        indicatorId: 4
    },
    {
        id: 5,
        name: 'Tantangan Ilmuwan Cilik',
        icon: '🧠',
        description: 'Soal berbasis situasi dan penalaran sederhana',
        color: 'purple',
        badge: { name: 'Ilmuwan Cilik', icon: '🏆' },
        indicatorId: 5
    }
];

const INDICATORS = [
    { id: 1, name: 'Mengenali bagian-bagian tubuh manusia', short: 'Bagian Tubuh' },
    { id: 2, name: 'Menjelaskan fungsi alat indera', short: 'Fungsi Indera' },
    { id: 3, name: 'Menghubungkan bagian tubuh dengan aktivitas sehari-hari', short: 'Tubuh & Aktivitas' },
    { id: 4, name: 'Menentukan kebiasaan yang membantu menjaga kesehatan tubuh', short: 'Menjaga Kesehatan' },
    { id: 5, name: 'Menalar solusi sederhana berdasarkan situasi yang berkaitan dengan tubuh dan kesehatan', short: 'Penalaran' }
];

const QUESTIONS = [
    // ============================================================
    // MISI 1 — PETA TUBUHKU (Indikator 1)
    // ============================================================
    {
        id: 1,
        mission: 1,
        indicator: 1,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Bagian tubuh yang digunakan untuk berjalan dan berlari adalah...',
        options: ['Tangan', 'Kaki', 'Kepala', 'Perut'],
        correctAnswer: 1,
        feedbackCorrect: 'Hebat! Kaki memang digunakan untuk berjalan dan berlari! 🦶',
        feedbackWrong: 'Belum tepat. Coba ingat lagi, bagian tubuh mana yang ada di bawah dan membantu kita berjalan?',
        points: 5
    },
    {
        id: 2,
        mission: 1,
        indicator: 1,
        type: 'true-false',
        typeBadge: 'Benar / Salah',
        question: 'Tangan digunakan untuk memegang dan mengambil benda.',
        options: ['Benar', 'Salah'],
        correctAnswer: 0,
        feedbackCorrect: 'Benar sekali! Tangan membantu kita memegang dan mengambil benda. 🤲',
        feedbackWrong: 'Belum tepat. Coba perhatikan, apa yang kamu gunakan saat mengambil pensil?',
        points: 5
    },
    {
        id: 3,
        mission: 1,
        indicator: 1,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Bagian tubuh yang melindungi otak kita adalah...',
        options: ['Dada', 'Perut', 'Kepala', 'Kaki'],
        correctAnswer: 2,
        feedbackCorrect: 'Tepat sekali! Kepala melindungi otak yang sangat penting! 🧠',
        feedbackWrong: 'Belum tepat. Otak berada di dalam bagian tubuh yang paling atas. Coba pikirkan lagi!',
        points: 5
    },
    {
        id: 4,
        mission: 1,
        indicator: 1,
        type: 'matching',
        typeBadge: 'Mencocokkan',
        question: 'Pasangkan! Bagian tubuh JARI-JARI digunakan untuk...',
        options: ['Berjalan jauh', 'Berpikir keras', 'Menulis dan menggambar', 'Mencerna makanan'],
        correctAnswer: 2,
        feedbackCorrect: 'Hebat! Jari-jari kita sangat penting untuk menulis dan menggambar! ✍️',
        feedbackWrong: 'Belum tepat. Coba perhatikan jari-jarimu, apa yang sering kamu lakukan dengannya di kelas?',
        points: 5
    },

    // ============================================================
    // MISI 2 — PASUKAN PANCAINDRA (Indikator 2)
    // ============================================================
    {
        id: 5,
        mission: 2,
        indicator: 2,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Bagian tubuh yang digunakan untuk melihat adalah...',
        options: ['Telinga', 'Mata', 'Hidung', 'Kulit'],
        correctAnswer: 1,
        feedbackCorrect: 'Tepat! Mata adalah indera penglihatan kita! 👀',
        feedbackWrong: 'Belum tepat. Indera untuk melihat adalah yang ada di wajah dan bisa berkedip.',
        points: 5
    },
    {
        id: 6,
        mission: 2,
        indicator: 2,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Indera yang digunakan untuk mendengar suara adalah...',
        options: ['Mata', 'Lidah', 'Telinga', 'Hidung'],
        correctAnswer: 2,
        feedbackCorrect: 'Benar! Telinga membantu kita mendengar berbagai suara! 👂',
        feedbackWrong: 'Belum tepat. Coba pikirkan, bagian tubuh mana yang ada di samping kepala dan membantu mendengar?',
        points: 5
    },
    {
        id: 7,
        mission: 2,
        indicator: 2,
        type: 'true-false',
        typeBadge: 'Benar / Salah',
        question: 'Lidah adalah alat indera yang digunakan untuk mencium bau.',
        options: ['Benar', 'Salah'],
        correctAnswer: 1,
        feedbackCorrect: 'Benar! Lidah digunakan untuk merasakan rasa, bukan mencium bau. Mencium bau menggunakan hidung! 👃',
        feedbackWrong: 'Belum tepat. Lidah merasakan rasa seperti manis dan asin. Untuk mencium bau, kita menggunakan hidung.',
        points: 5
    },
    {
        id: 8,
        mission: 2,
        indicator: 2,
        type: 'situational',
        typeBadge: 'Situasi',
        scenario: '📖 Rani sedang bermain di dapur. Tiba-tiba ia mencium aroma masakan ibu yang sangat sedap.',
        question: 'Indera yang digunakan Rani untuk mencium aroma masakan adalah...',
        options: ['Mata', 'Hidung', 'Kulit', 'Telinga'],
        correctAnswer: 1,
        feedbackCorrect: 'Hebat! Hidung adalah alat indera pencium yang digunakan Rani! 👃',
        feedbackWrong: 'Belum tepat. Untuk mencium aroma atau bau, kita menggunakan hidung.',
        points: 5
    },

    // ============================================================
    // MISI 3 — TUBUHKU BEKERJA (Indikator 3)
    // ============================================================
    {
        id: 9,
        mission: 3,
        indicator: 3,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Saat menulis di buku, bagian tubuh yang paling berperan adalah...',
        options: ['Kaki', 'Telinga', 'Tangan', 'Hidung'],
        correctAnswer: 2,
        feedbackCorrect: 'Benar! Tangan adalah bagian tubuh utama yang kita gunakan saat menulis! ✍️',
        feedbackWrong: 'Belum tepat. Coba perhatikan, apa yang kamu gerakkan saat menulis?',
        points: 5
    },
    {
        id: 10,
        mission: 3,
        indicator: 3,
        type: 'situational',
        typeBadge: 'Situasi',
        scenario: '📖 Doni sangat suka bermain sepak bola. Saat istirahat, ia bermain bola dengan teman-temannya di lapangan.',
        question: 'Bagian tubuh utama yang Doni gunakan untuk menendang bola adalah...',
        options: ['Tangan', 'Kepala', 'Mulut', 'Kaki'],
        correctAnswer: 3,
        feedbackCorrect: 'Tepat! Kaki digunakan untuk menendang bola saat bermain sepak bola! ⚽',
        feedbackWrong: 'Belum tepat. Dalam sepak bola, pemain menggunakan bagian tubuh bagian bawah untuk menendang.',
        points: 5
    },
    {
        id: 11,
        mission: 3,
        indicator: 3,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Saat mendengarkan guru bercerita di kelas, alat indera yang paling berperan adalah...',
        options: ['Mata', 'Telinga', 'Hidung', 'Lidah'],
        correctAnswer: 1,
        feedbackCorrect: 'Benar! Telinga membantu kita mendengarkan cerita guru dengan baik! 👂',
        feedbackWrong: 'Belum tepat. Untuk mendengarkan suara guru, kita menggunakan alat indera pendengaran.',
        points: 5
    },
    {
        id: 12,
        mission: 3,
        indicator: 3,
        type: 'matching',
        typeBadge: 'Mencocokkan',
        question: 'Pasangkan! Kegiatan MEMBACA BUKU paling banyak menggunakan alat indera...',
        options: ['Telinga — pendengaran', 'Hidung — penciuman', 'Mata — penglihatan', 'Kulit — peraba'],
        correctAnswer: 2,
        feedbackCorrect: 'Hebat! Membaca buku membutuhkan mata sebagai indera penglihatan! 📖',
        feedbackWrong: 'Belum tepat. Untuk membaca, kita harus melihat huruf-huruf di buku. Indera apa yang digunakan untuk melihat?',
        points: 5
    },

    // ============================================================
    // MISI 4 — DETEKTIF KESEHATAN (Indikator 4)
    // ============================================================
    {
        id: 13,
        mission: 4,
        indicator: 4,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Kebiasaan yang baik untuk menjaga kesehatan gigi adalah...',
        options: ['Makan permen setiap hari', 'Menggosok gigi dua kali sehari', 'Tidak pernah ke dokter gigi', 'Menggigit benda keras'],
        correctAnswer: 1,
        feedbackCorrect: 'Benar! Menggosok gigi dua kali sehari membuat gigi tetap sehat dan kuat! 🦷',
        feedbackWrong: 'Belum tepat. Gigi perlu dirawat setiap hari agar tetap sehat. Salah satu caranya adalah rajin menggosok gigi.',
        points: 5
    },
    {
        id: 14,
        mission: 4,
        indicator: 4,
        type: 'multiple-choice',
        typeBadge: 'Pilihan Ganda',
        question: 'Budi sering membaca buku dengan posisi terlalu dekat. Apa yang sebaiknya dilakukan Budi?',
        options: ['Membaca semakin dekat', 'Membaca di tempat yang cukup terang dan menjaga jarak', 'Menutup satu mata', 'Membaca sambil berlari'],
        correctAnswer: 1,
        feedbackCorrect: 'Tepat! Membaca di tempat yang terang dengan jarak yang cukup akan menjaga kesehatan mata! 👓',
        feedbackWrong: 'Belum tepat. Mata perlu dijaga dengan cara membaca di tempat terang dan tidak terlalu dekat.',
        points: 5
    },
    {
        id: 15,
        mission: 4,
        indicator: 4,
        type: 'true-false',
        typeBadge: 'Benar / Salah',
        question: 'Mandi dua kali sehari baik untuk menjaga kebersihan dan kesehatan kulit.',
        options: ['Benar', 'Salah'],
        correctAnswer: 0,
        feedbackCorrect: 'Benar sekali! Mandi dua kali sehari membantu menjaga kulit tetap bersih dan sehat! 🚿',
        feedbackWrong: 'Belum tepat. Mandi teratur sangat penting untuk kebersihan tubuh, terutama kulit.',
        points: 5
    },
    {
        id: 16,
        mission: 4,
        indicator: 4,
        type: 'situational',
        typeBadge: 'Situasi',
        scenario: '📖 Setelah bermain di luar rumah, tangan Dika terlihat sangat kotor. Dika merasa lapar dan ingin segera makan.',
        question: 'Sebelum makan, tindakan yang paling tepat dilakukan Dika adalah...',
        options: ['Langsung makan', 'Mengusap tangan pada baju', 'Mencuci tangan dengan sabun', 'Meminta teman membersihkan tangannya'],
        correctAnswer: 2,
        feedbackCorrect: 'Hebat! Mencuci tangan dengan sabun sebelum makan sangat penting untuk menjaga kesehatan! 🧼',
        feedbackWrong: 'Belum tepat. Sebelum makan, kita harus membersihkan tangan dari kuman dengan cara yang benar.',
        points: 5
    },

    // ============================================================
    // MISI 5 — TANTANGAN ILMUWAN CILIK (Indikator 5)
    // ============================================================
    {
        id: 17,
        mission: 5,
        indicator: 5,
        type: 'situational',
        typeBadge: 'Situasi',
        scenario: '📖 Saat mencuci piring, Ani tidak sengaja menyentuh air yang sangat panas. Ani langsung menarik tangannya dengan cepat.',
        question: 'Hal ini terjadi karena...',
        options: ['Tangan Ani sangat lemah', 'Kulit Ani merasakan panas', 'Air panasnya berwarna merah', 'Ani sedang bermain air'],
        correctAnswer: 1,
        feedbackCorrect: 'Hebat! Kulit adalah indera peraba yang bisa merasakan panas, dingin, dan sakit! 🖐️',
        feedbackWrong: 'Belum tepat. Ketika menyentuh sesuatu yang panas, bagian tubuh kita yang merasakan adalah kulit (indera peraba).',
        points: 5
    },
    {
        id: 18,
        mission: 5,
        indicator: 5,
        type: 'situational',
        typeBadge: 'Penalaran',
        scenario: '📖 Ibu guru bertanya kepada siswa: "Mengapa kita perlu tidur yang cukup setiap malam?"',
        question: 'Jawaban yang paling tepat adalah...',
        options: ['Agar tidak bosan di rumah', 'Agar tubuh bisa beristirahat dan tumbuh sehat', 'Karena disuruh oleh guru', 'Agar tidak merasa lapar'],
        correctAnswer: 1,
        feedbackCorrect: 'Tepat sekali! Tidur cukup membuat tubuh beristirahat, memulihkan tenaga, dan tumbuh sehat! 😴',
        feedbackWrong: 'Belum tepat. Tidur sangat penting bagi tubuh kita agar bisa beristirahat dan tumbuh dengan baik.',
        points: 5
    },
    {
        id: 19,
        mission: 5,
        indicator: 5,
        type: 'situational',
        typeBadge: 'Situasi',
        scenario: '📖 Rudi sedang flu. Saat ibu memasak nasi goreng kesukaannya, Rudi tidak bisa mencium aroma masakannya sama sekali.',
        question: 'Hal ini terjadi karena...',
        options: ['Makanannya tidak enak', 'Rudi tidak lapar', 'Hidung Rudi sedang terganggu karena flu', 'Mata Rudi yang sakit'],
        correctAnswer: 2,
        feedbackCorrect: 'Hebat! Saat flu, hidung tersumbat sehingga indera penciuman tidak bisa bekerja dengan baik! 🤧',
        feedbackWrong: 'Belum tepat. Saat flu, bagian tubuh yang terganggu fungsinya untuk mencium bau adalah hidung.',
        points: 5
    },
    {
        id: 20,
        mission: 5,
        indicator: 5,
        type: 'situational',
        typeBadge: 'Penalaran',
        scenario: '📖 Pak guru meminta siswa menutup mata, lalu memegang beberapa benda yang berbeda. Siswa berhasil menebak benda tersebut tanpa melihat.',
        question: 'Siswa bisa menebak benda tersebut karena menggunakan indera...',
        options: ['Penglihatan (mata)', 'Pendengaran (telinga)', 'Penciuman (hidung)', 'Peraba (kulit)'],
        correctAnswer: 3,
        feedbackCorrect: 'Luar biasa! Kulit adalah indera peraba yang bisa merasakan bentuk, tekstur, dan suhu benda! 🖐️',
        feedbackWrong: 'Belum tepat. Karena mata ditutup, siswa menggunakan tangan (kulit) untuk merasakan bentuk benda. Indera ini disebut indera peraba.',
        points: 5
    }
];

/**
 * Mendapatkan soal-soal untuk misi tertentu
 * @param {number} missionId - ID misi (1-5)
 * @returns {Array} Array soal untuk misi tersebut
 */
function getQuestionsForMission(missionId) {
    return QUESTIONS.filter(q => q.mission === missionId);
}

/**
 * Mendapatkan data misi berdasarkan ID
 * @param {number} missionId - ID misi (1-5)
 * @returns {Object} Data misi
 */
function getMissionById(missionId) {
    return MISSIONS.find(m => m.id === missionId);
}
