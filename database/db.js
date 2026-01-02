const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../database/db.json');

class Database {
    constructor() {
        this.data = this.load();
    }

    load() {
        try {
            if (!fs.existsSync(DB_PATH)) {
                fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2), 'utf-8');
                return {};
            }
            const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('FATAL: Could not load or create database file.', error);
            return {};
        }
    }

    save() {
        try {
            const dir = path.dirname(DB_PATH);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
        } catch (error) {
            console.error('FATAL: Could not save to database file.', error);
        }
    }

    getUser(number) { if (!number || typeof number !== 'string') return null; return this.data[number] || null; }
    addUser(number, name = '') { if (!number || typeof number !== 'string') return null; if (!this.data[number]) { this.data[number] = { name: name || 'Unknown', banned: false, limit: 0, lastSeen: new Date().toISOString() }; this.save(); } return this.data[number]; }
    updateUser(number, updates) { if (!number || typeof number !== 'string' || !this.data[number]) return; this.data[number] = { ...this.data[number], ...updates, lastSeen: new Date().toISOString() }; this.save(); }
    getAllBannedUsers() { return Object.keys(this.data).filter(number => this.data[number].banned); }
    cleanDatabase() { const now = new Date(); const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1)); let deletedCount = 0; for (const number in this.data) { try { const lastSeen = new Date(this.data[number].lastSeen); if (lastSeen < oneMonthAgo && !this.data[number].banned) { delete this.data[number]; deletedCount++; } } catch (e) { console.error(`Error cleaning user ${number}:`, e); } } this.save(); return deletedCount; }
}

module.exports = new Database();