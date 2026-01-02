const gameState = {
    family100: {},
    caklontong: {},
    tebaklogo: {},
    tebakkata: {},
    tekateki: {},
    ulartangga: {}
};

const family100Questions = [
    { question: "Hal yang ada di meja makan", answers: ["piring", "sendok", "garpu", "gelas", "mangkok", "tisu", "nampan", "cangkir", "sutil", "pembuka botol"] },
    { question: "Nama-nama hari dalam seminggu", answers: ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"] },
    { question: "Buah-buahan yang berwarna merah", answers: ["apel", "strawberry", "semangka", "ceri", "jambu", "nanas merah", "tomat"] }
];
const cakLontongQuestions = [
    { question: "Apa yang ada di sawah tapi bukan padi?", answer: "Kerbau" },
    { question: "Mengapa orang menyeberang jalan di zebra cross?", answer: "Karena zebra cross tidak bisa menyeberang jalan sendiri" },
    { question: "Apa yang punya mata tapi tidak bisa melihat?", answer: "Jarum" }
];
const tebakLogoQuestions = [
    { question: "https://i.ibb.co/6yFv2C7/logo1.jpg", answer: "Google" },
    { question: "https://i.ibb.co/8XbV6Jp/logo2.jpg", answer: "Facebook" },
    { question: "https://i.ibb.co/3s8H4kZ/logo3.jpg", answer: "Instagram" }
];
const tebakKataQuestions = [
    { question: "Binatang apa yang suka makan pisang?", answer: "Monyet" },
    { question: "Apa ibu kota Indonesia?", answer: "Jakarta" },
    { question: "Siapa presiden pertama Indonesia?", answer: "Soekarno" }
];
const tekaTekiQuestions = [
    { question: "Apa yang bisa berjalan tapi tidak punya kaki?", answer: "Jam" },
    { question: "Apa yang bisa terbang tapi tidak punya sayap?", answer: "Waktu" },
    { question: "Apa yang punya mulut tapi tidak bisa bicara?", answer: "Sungai" }
];

function formatUlarTanggaBoard(board, playerPosition) {
    let boardStr = "🎲 *PAPAN ULAR TANGGA* 🎲\n\n";
    for (let i = 100; i >= 1; i -= 10) {
        let row = "";
        for (let j = 0; j < 10; j++) {
            const pos = i - j;
            if (pos === playerPosition) row += "🔴 ";
            else if (board[pos] && board[pos].type === 'snake') row += "🐍 ";
            else if (board[pos] && board[pos].type === 'ladder') row += "🪢 ";
            else row += "⬜ ";
        }
        boardStr += row + "\n";
    }
    boardStr += "\n🔴 = Kamu | 🐍 = Ular | 🪢 = Tangga | ⬜ = Normal";
    return boardStr;
}

async function handleGameCommand(command, message, msgBody) {
    const sender = message.from;

    if (command === '.family100') {
        if (gameState.family100[sender]) return message.reply('🎮 Game Family 100 sudah dimulai!');
        const q = family100Questions[Math.floor(Math.random() * family100Questions.length)];
        gameState.family100[sender] = { question: q.question, answers: q.answers, found: [] };
        return message.reply(`🎮 *FAMILY 100*\n\nPertanyaan: ${q.question}\n\nTebak jawabannya!`);
    }
    if (gameState.family100[sender]) {
        const game = gameState.family100[sender];
        const userAnswer = msgBody;
        if (game.answers.includes(userAnswer) && !game.found.includes(userAnswer)) {
            game.found.push(userAnswer);
            await message.reply(`✅ Benar! "${userAnswer}"\n\nDitemukan: ${game.found.length}/${game.answers.length}`);
            if (game.found.length === game.answers.length) {
                await message.reply(`🎉 SELAMAT! Semua jawaban ditemukan!`);
                delete gameState.family100[sender];
            }
        } else { await message.reply(`❌ Salah atau sudah ada. Coba lagi!`); }
        return;
    }

    // Implementasi untuk game lainnya mengikuti pola yang sama
    if (command === '.caklontong') {
        const q = cakLontongQuestions[Math.floor(Math.random() * cakLontongQuestions.length)];
        gameState.caklontong[sender] = { question: q.question, answer: q.answer.toLowerCase(), attempts: 0 };
        await message.reply(`🎮 *CAK LONTONG*\n\nPertanyaan: ${q.question}\n\nJawab dengan tebakanmu!`);
        return;
    }
    if (gameState.caklontong[sender]) {
        const game = gameState.caklontong[sender];
        if (msgBody === game.answer) { await message.reply(`🎉 BENAR! Jawabannya adalah "${game.answer}"`); delete gameState.caklontong[sender]; }
        else { game.attempts++; await message.reply(`❌ Salah! Coba lagi.`); if (game.attempts >= 3) { await message.reply(`💡 Jawaban yang benar: "${game.answer}"`); delete gameState.caklontong[sender]; } }
        return;
    }
    // ... tambahkan logika untuk .tebaklogo, .tebakkata, .teka-teki, .ulartangga
}

module.exports = { handleGameCommand };