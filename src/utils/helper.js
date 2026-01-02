const chalk = require('chalk');

function displayPairingCode(code, clientInfo) {
    console.clear();
    console.log(chalk.cyan.bold(`
╔════════════════════════════════════════════════╗
║                                                  ║
║     ${chalk.yellow.bold('WhatsApp Bot - Kode Pairing')}     ║
║                                                  ║
╚════════════════════════════════════════════════╝
`));
    console.log(chalk.green.bold('📱 Hubungkan Bot ke WhatsApp Anda:'));
    console.log(chalk.magenta('--------------------------------------------------'));
    console.log(chalk.white.bold(`   Kode Pairing Anda: ${chalk.yellowBright(code)}`));
    console.log(chalk.magenta('--------------------------------------------------'));
    console.log(chalk.blue('📋 Cara Menghubungkan:'));
    console.log(chalk.white('1. Buka aplikasi WhatsApp di HP Anda.'));
    console.log(chalk.white('2. Pilih `Titik Tiga` > `Perangkat Tertaut`.'));
    console.log(chalk.white('3. Tap `Tautkan perangkat`.'));
    console.log(chalk.white(`4. Masukkan kode 8 digit di atas: ${chalk.yellowBright(code)}`));
    console.log(chalk.magenta('--------------------------------------------------'));
    console.log(chalk.yellowBright('⏳ Menunggu perangkat tertaut...'));
}

function displayReady(info) {
    console.clear();
    console.log(chalk.cyan.bold(`
╔════════════════════════════════════════════════╗
║                                                  ║
║       ${chalk.green.bold('✅ Bot WhatsApp Berhasil Terhubung!')}       ║
║                                                  ║
╚════════════════════════════════════════════════╝
`));
    console.log(chalk.blue(`📱 Nomor Bot: ${info.wid.user}`));
    console.log(chalk.green(`🚀 Bot siap digunakan!`));
}

module.exports = { displayPairingCode, displayReady };