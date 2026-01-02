const config = require('../../config.json');
const db = require('../database/db');
const { menuCommand } = require('../commands/menu');
const { handleGameCommand } = require('../commands/game');
const { handleAICommand } = require('../commands/ai');
const { handleGroupCommand } = require('../commands/group');
const { handleConfessCommand, checkConfessionReply } = require('../commands/confess');
const { handleOwnerCommand } = require('../commands/owner');
const { handleStalkerCommand } = require('../commands/stalker');
const { handleStickerCommand } = require('../commands/sticker');

const users = new Set();

async function handleMessage(client, message) {
    if (!message.body || message.body.trim() === '') return;
    const msgBody = message.body.toLowerCase().trim();
    const sender = message.from;
    
    let user = db.getUser(sender);
    if (!user) user = db.addUser(sender, message.notifyName || 'Unknown');
    if (user.banned) { console.log(`[BANNED] ${sender} tried to use the bot.`); return; }
    if (!users.has(sender)) users.add(sender);
    await checkConfessionReply(client, message);

    const commandList = { '.menu': true, '.allmenu': true, '.family100': true, '.caklontong': true, '.chatgpt': true, '.gemini': true, '.stalkig': true, '.brat': true, '.add': true, '.kick': true, '.confes': true, '.berhenticonfes': true, '.banned': true, '.unbanned': true, '.jadibot': true, '.settingbot': true, '.limit': true, '.sampah': true };
    const command = Object.keys(commandList).find(cmd => msgBody.startsWith(cmd));
    if (!command) return;

    console.log(`[COMMAND] ${sender} executed: ${command}`);
    try {
        switch (command) {
            case '.menu': case '.allmenu': await menuCommand(client, message, command === '.allmenu', users); break;
            case '.add': case '.kick': await handleGroupCommand(client, message, command); break;
            case '.confes': case '.berhenticonfes': await handleConfessCommand(client, message, command); break;
            case '.banned': case '.unbanned': case '.jadibot': case '.settingbot': case '.limit': case '.sampah': await handleOwnerCommand(client, message, command); break;
            case '.family100': case '.caklontong': case '.tebaklogo': case '.tebakkata': case '.teka-teki': case '.ulartangga': await handleGameCommand(command, message, msgBody); break;
            case '.chatgpt': case '.gemini': await handleAICommand(command, message); break;
            case '.stalkig': case '.stalkwa': case '.stalktt': await handleStalkerCommand(command, message); break;
            case '.brat': case '.bratvid': await handleStickerCommand(command, message); break;
        }
    } catch (error) {
        console.error(`[ERROR] Command ${command} failed:`, error);
        await message.reply('❌ Terjadi kesalahan internal. Silakan coba lagi nanti.').catch(() => {});
    }
}

module.exports = { handleMessage, users };