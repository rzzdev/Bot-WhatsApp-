const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const chalk = require('chalk');
const { displayPairingCode, displayReady } = require('./utils/helper');
const { handleMessage } = require('./handlers/messageHandler');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running!'));

const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'whatsapp-bot-session', dataPath: './.wwebjs_auth/' }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    }
});

// Event ini akan terpicu jika bot belum terhubung dan memerlukan pairing
client.on('qr', async (qr) => {
    // QR string sebenarnya adalah pairing code
    const pairingCode = await client.requestPairingCode('6283867962275'); // GANTI dengan nomor HP Anda untuk menerima notifikasi
    displayPairingCode(pairingCode, null);
});

client.on('ready', () => displayReady(client.info));
client.on('message', async (message) => await handleMessage(client, message));
client.on('auth_failure', (msg) => console.error(chalk.red.bold('❌ AUTH FAILURE:'), msg));
client.on('disconnected', (reason) => console.log(chalk.red.bold('🔌 DISCONNECTED:'), reason));

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log(chalk.blue.bold('🚀 Starting WhatsApp Bot Ultimate...'));
client.initialize().catch(err => console.error(chalk.red.bold('Gagal menginisialisasi klien:'), err));
app.listen(PORT, () => console.log(chalk.green(`🌐 Health check server on port ${PORT}`)));
process.on('SIGINT', () => { console.log(chalk.yellow.bold('\n🛑 Shutting down...')); if (client) client.destroy(); process.exit(0); });