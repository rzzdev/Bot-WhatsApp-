const activeConfessions = new Map();

async function handleConfessCommand(client, message, command) {
    const sender = message.from;
    const args = message.body.split(' ');
    const targetNumber = args[1] ? args[1].replace(/[^0-9]/g, '') + '@c.us' : null;

    switch (command) {
        case '.confes':
            if (!targetNumber) return message.reply('❌ Masukkan nomor target!\nContoh: .confes 628xxxxxxxxxx Hai, aku suka sama kamu');
            const confessionText = message.body.substring(command.length + args[1].length + 2);
            if (!confessionText) return message.reply('❌ Masukkan pesan confes kamu!');

            activeConfessions.set(targetNumber, { from: sender, message: confessionText });
            await client.sendMessage(targetNumber, `💬 *Confession Message*\n\n"${confessionText}"\n\n_Balas pesan ini untuk membalas confes._`);
            await message.reply('✅ Pesan confes kamu telah terkirim secara anonim. Balasan akan diteruskan ke kamu.');
            break;

        case '.berhenticonfes':
            if (activeConfessions.has(sender)) {
                activeConfessions.delete(sender);
                return message.reply('✅ Kamu telah berhenti menerima balasan confes.');
            }
            if (sender === config.botInfo.ownerNumber && activeConfessions.has(targetNumber)) {
                activeConfessions.delete(targetNumber);
                return message.reply(`✅ Sesi confes untuk ${targetNumber.split('@')[0]} telah dihentikan oleh owner.`);
            }
            return message.reply('❌ Tidak ada sesi confes aktif untuk nomor kamu.');
    }
}

async function checkConfessionReply(client, message) {
    const sender = message.from;
    const confession = activeConfessions.get(sender);

    if (confession && message.body) {
        const originalSender = confession.from;
        await client.sendMessage(originalSender, `💬 *Balasan Confession Dari ${sender.split('@')[0]}:*\n\n"${message.body}"`);
        await message.reply('✅ Balasan kamu telah diteruskan.');
    }
}

module.exports = { handleConfessCommand, checkConfessionReply };