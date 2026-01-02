const config = require('../../config.json');
const db = require('../database/db');

async function handleOwnerCommand(client, message, command) {
    const sender = message.from;
    if (sender !== config.botInfo.ownerNumber) {
        return message.reply('❌ Perintah ini hanya bisa digunakan oleh owner bot!');
    }

    const args = message.body.split(' ');
    const targetNumber = args[1] ? args[1].replace(/[^0-9]/g, '') + '@c.us' : null;

    switch (command) {
        case '.banned':
            if (!targetNumber) return message.reply('❌ Masukkan nomor target!\nContoh: .banned 628xxxxxxxxxx');
            db.addUser(targetNumber);
            db.updateUser(targetNumber, { banned: true });
            return message.reply(`✅ Berhasil membanned user ${targetNumber.split('@')[0]}`);

        case '.unbanned':
            if (!targetNumber) return message.reply('❌ Masukkan nomor target!\nContoh: .unbanned 628xxxxxxxxxx');
            db.updateUser(targetNumber, { banned: false });
            return message.reply(`✅ Berhasil meng-unbanned user ${targetNumber.split('@')[0]}`);

        case '.jadibot':
            return message.reply('🤖 *Fitur Jadibot*\n\nFitur ini memerlukan implementasi yang sangat kompleks. Saat ini hanya konsep.');

        case '.settingbot':
            const settings = config.settings;
            return message.reply(`⚙️ *Pengaturan Bot Saat Ini:*\n\n• Group Only: ${settings.groupOnly ? 'Ya' : 'Tidak'}\n• Max Daily Limit: ${settings.maxDailyLimit}`);

        case '.limit':
            return message.reply(`📊 *Informasi Limit*\n\n• Limit Pengguna: ${config.botInfo.userLimit}\n• Maksimal/Hari: ${config.settings.maxDailyLimit}`);

        case '.sampah':
            const deletedCount = db.cleanDatabase();
            return message.reply(`🗑️ *Pembersihan Database*\n\nBerhasil menghapus ${deletedCount} pengguna tidak aktif dari database.`);

        default:
            return message.reply('❌ Perintah owner tidak dikenal.');
    }
}

module.exports = { handleOwnerCommand };