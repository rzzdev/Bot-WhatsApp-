const { MessageMedia } = require('whatsapp-web.js');

async function createBratSticker(text) {
    try {
        const imageUrl = `https://api.betabotz.eu.org/api/maker/brat?text=${encodeURIComponent(text)}`;
        const media = await MessageMedia.fromUrl(imageUrl);
        return media;
    } catch (error) {
        console.error("Brat Sticker Error:", error.message);
        return null;
    }
}

async function handleStickerCommand(command, message) {
    const text = message.body.substring(command.length + 2);
    if (!text) return message.reply('❌ Silakan masukkan teks untuk stiker.');

    if (command === '.brat') {
        await message.reply('🎨 Membuat stiker Brat...');
        const stickerMedia = await createBratSticker(text);
        if (stickerMedia) {
            await message.reply(stickerMedia, null, { sendMediaAsSticker: true });
        } else {
            await message.reply('❌ Gagal membuat stiker.');
        }
    }
    // .bratvid bisa di-handle di sini atau sebagai placeholder
}

module.exports = { handleStickerCommand };