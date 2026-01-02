const axios = require('axios');

async function stalkInstagram(username) {
    try {
        const response = await axios.get(`https://api.popcat.xyz/instagram?user=${username}`);
        const data = response.data;
        if (data.error) return `❌ Error: ${data.error}`;
        
        let result = `👤 *PROFIL INSTAGRAM*\n\n`;
        result += `📷 Username: ${data.username}\n`;
        result += `🏷️ Nama: ${data.full_name}\n`;
        result += `📝 Bio: ${data.biography}\n`;
        result += `👥 Followers: ${data.followers}\n`;
        result += `🫂 Following: ${data.following}\n`;
        result += `📸 Posts: ${data.posts}\n`;
        result += `🔗 Private: ${data.private ? 'Ya' : 'Tidak'}\n`;
        result += `✅ Verified: ${data.verified ? 'Ya' : 'Tidak'}`;
        return result;
    } catch (error) {
        return "❌ Tidak dapat mengambil data. Username mungkin tidak ada atau API sedang bermasalah.";
    }
}

async function handleStalkerCommand(command, message) {
    const args = message.body.split(' ');
    const username = args[1];

    if (command === '.stalkig') {
        if (!username) return message.reply('❌ Masukkan username Instagram!\nContoh: .stalkig justinbieber');
        await message.reply(`🔍 *Mencari profil Instagram...*`);
        const result = await stalkInstagram(username);
        return message.reply(result);
    }
    
    // Placeholder untuk stalker lainnya
    return message.reply(`🔍 *STALKER*\n\nFitur ini adalah placeholder.`);
}

module.exports = { handleStalkerCommand };