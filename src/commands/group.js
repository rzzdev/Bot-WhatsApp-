const config = require('../../config.json');

async function handleGroupCommand(client, message, command) {
    const chat = await message.getChat();
    if (!chat.isGroup) return message.reply('❌ Perintah ini hanya bisa digunakan di dalam grup!');

    const botAdmin = chat.participants.find(p => p.id._serialized === client.info.wid._serialized && p.isAdmin);
    const senderAdmin = chat.participants.find(p => p.id._serialized === message.from && p.isAdmin);

    if (!botAdmin) return message.reply('❌ Bot harus menjadi admin untuk menggunakan perintah ini!');
    if (!senderAdmin && !message.author.includes(config.botInfo.ownerNumber)) return message.reply('❌ Kamu harus admin grup untuk menggunakan perintah ini!');

    const args = message.body.split(' ');
    const targetNumber = args[1] ? args[1].replace(/[^0-9]/g, '') + '@c.us' : null;

    if (!targetNumber) return message.reply('❌ Masukkan nomor target!\nContoh: .add 628xxxxxxxxxx');

    try {
        switch (command) {
            case '.add':
                await chat.addParticipants([targetNumber]);
                await message.reply(`✅ Berhasil menambahkan ${targetNumber.split('@')[0]} ke grup.`);
                break;
            case '.kick':
                await chat.removeParticipants([targetNumber]);
                await message.reply(`✅ Berhasil mengeluarkan ${targetNumber.split('@')[0]} dari grup.`);
                break;
        }
    } catch (error) {
        console.error("Group command error:", error);
        await message.reply(`❌ Gagal menjalankan perintah. Pastikan nomor benar dan pengguna ada di WhatsApp.`);
    }
}

module.exports = { handleGroupCommand };