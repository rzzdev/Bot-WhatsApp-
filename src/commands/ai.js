const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');
const config = require('../../config.json');

async function chatWithGPT(prompt) {
    if (!config.apiKeys.openai || config.apiKeys.openai === "MASUKKAN_OPENAI_API_KEY_DISINI") {
        return "❌ Error: API Key OpenAI belum diatur.";
    }
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }],
        }, { headers: { 'Authorization': `Bearer ${config.apiKeys.openai}` } });
        return response.data.choices[0].message.content;
    } catch (error) {
        return "❌ Gagal menghubungi OpenAI.";
    }
}

async function chatWithGemini(prompt) {
    if (!config.apiKeys.gemini || config.apiKeys.gemini === "MASUKKAN_GEMINI_API_KEY_DISINI") {
        return "❌ Error: API Key Gemini belum diatur.";
    }
    try {
        const auth = new GoogleAuth({ apiKey: config.apiKeys.gemini, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${config.apiKeys.gemini}`;
        const response = await axios.post(url, { contents: [{ parts: [{ text: prompt }] }] });
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "❌ Gagal menghubungi Gemini.";
    }
}

async function handleAICommand(command, message) {
    const prompt = message.body.substring(command.length + 2);

    if (command === '.chatgpt') {
        await message.reply('🤖 *CHATGPT*\n\nMencari jawaban...');
        const reply = await chatWithGPT(prompt);
        return message.reply(reply);
    }

    if (command === '.gemini') {
        await message.reply('🤖 *GEMINI*\n\nMencari jawaban...');
        const reply = await chatWithGemini(prompt);
        return message.reply(reply);
    }
}

module.exports = { handleAICommand };