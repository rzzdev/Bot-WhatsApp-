const { MessageMedia } = require('whatsapp-web.js');
const config = require('../../config.json');

async function menuCommand(client, message, isAllMenu = false, users) {
    const sender = message.from;
    if (!users.has(sender)) users.add(sender);

    try {
        if (config.botInfo.menuAudioUrl) {
            const menuAudio = await MessageMedia.fromUrl(config.botInfo.menuAudioUrl, { unsafeMime: true });
            await message.reply(menuAudio);
        }
        
        const menuImage = await MessageMedia.fromUrl(config.botInfo.menuImageUrl);
        const botUsername = client.info.wid.user;
        const isOwner = sender === config.botInfo.ownerNumber;

        let menuText = `╔══════════════════════════════════╗\n║  🤖 *INFORMASI BOT WhatsApp* 🤖  ║\n╚══════════════════════════════════╝\n\n`;
        menuText += `📱 *Bot* : ${botUsername}\n`;
        menuText += `👤 *Owner* : ${config.botInfo.ownerName}\n`;
        menuText += `👥 *Pengguna Aktif* : ${users.size} Orang\n`;
        menuText += `💰 *Status* : ${config.botInfo.isFree ? '✅ Gratis' : '❌ Berbayar'}\n`;
        menuText += `📅 *Dibuat* : ${config.botInfo.creationDate}\n\n`;
        menuText += `─────────────────────────────────\n\n`;

        if (isAllMenu) {
            menuText += `╔══════════════════════════════════╗\n║  🎮 *MENU HIBURAN & GAME* 🎮  ║\n╚══════════════════════════════════╝\n`;
            menuText += `⚡ .family100  - Tebak 100 Jawaban\n`;
            menuText += `⚡ .caklontong - Teka-Teki Lucu\n`;
            menuText += `⚡ .tebaklogo  - Tebak Logo Merek\n`;
            menuText += `⚡ .tebakkata  - Tebak Kata Umum\n`;
            menuText += `⚡ .teka-teki  - Teka-Teki Logika\n`;
            menuText += `⚡ .ulartangga - Game Ular Tangga\n\n`;
            
            menuText += `╔══════════════════════════════════╗\n║  🤖 *MENU KEJERAN BUATAN* 🤖  ║\n╚══════════════════════════════════╝\n`;
            menuText += `🧠 .chatgpt (pesan) - Tanya ChatGPT\n`;
            menuText += `🧠 .gemini (pesan) - Tanya Google AI\n\n`;
            
            menuText += `╔══════════════════════════════════╗\n║  💬 *MENU INTERAKSI & PRIVASI* 💬  ║\n╚══════════════════════════════════╝\n`;
            menuText += `💌 .confes (628xx) (pesan) - Kirim Pesan Rahasia\n`;
            menuText += `🛑 .berhenticonfes (628xx) - Hentikan Sesi Confes\n\n`;
            
            menu text += `╔══════════════════════════════════╗\n║  👥 *MENU ADMIN GRUP* 👥  ║\n╚══════════════════════════════════╝\n`;
            menuText += `➕ .add (628xx) - Tambah Member\n`;
            menuText += `➖ .kick (628xx) - Keluarkan Member\n\n`;

            if (isOwner) {
                menuText += `╔══════════════════════════════════╗\n║  👑 *MENU KHUSUS OWNER* 👑  ║\n╚══════════════════════════════════╝\n`;
                menuText += `🚫 .banned (628xx) - Banned User\n`;
                menuText += `✅ .unbanned (628xx) - Unbanned User\n`;
                menuText += `⚙️ .settingbot - Lihat Pengaturan\n`;
                menuText += `🗑️ .sampah - Bersihkan Database\n`;
                menuText += `📊 .limit - Info Limit Bot\n\n`;
            }
        } else {
            menuText += `╔══════════════════════════════════╗\n║  ✨ *MENU UTAMA* ✨  ║\n╚══════════════════════════════════╝\n`;
            menuText += `🎮 .family100  - Tebak 100 Jawaban\n`;
            menuText += `🎮 .caklontong - Teka-Teki Lucu\n`;
            menuText += `🤖 .chatgpt (pesan) - Tanya AI\n`;
            menuText += `💌 .confes (628xx) (pesan) - Kirim Pesan Rahasia\n`;
            menuText += `🎨 .brat (teks) - Buat Stiker Keren\n\n`;
            menuText += `👑 *Ketik .allmenu untuk lihat semua fitur.*\n`;
        }
        
        menuText += `─────────────────────────────────\n`;
        menuText += `🔗 *Sosial Media Owner*\n`;
        menuText += `📷 Instagram: ${config.botInfo.socialMedia.instagram}\n`;
        menuText += `💻 GitHub: ${config.botInfo.socialMedia.github}\n\n`;
        menuText += `_Powered by WhatsApp Bot Ultimate_`;
        
        await message.reply(menuImage, null, { caption: menuText });
    } catch (error) {
        console.error('Gagal mengirim menu:', error.message);
        await message.reply('❌ Maaf, terjadi kesalahan saat memuat menu.');
    }
}

module.exports = { menuCommand };