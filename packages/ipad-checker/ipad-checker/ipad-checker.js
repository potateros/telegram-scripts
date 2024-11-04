const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');

// Initialize Telegram bot
const bot = new TelegramBot("7838931730:AAGEUJY9WWYAZOpmLCIO-zqTTXKNu4_Iz3Q", { polling: false });
const CHAT_ID = "4994094";

// URL to check
const URL = 'https://www.apple.com/my/shop/buy-ipad/ipad-mini';

// String to look for
const UNAVAILABLE_TEXT = 'Check back later';

async function checkAvailability() {
    try {
        const response = await fetch(URL);
        const html = await response.text();

        const isUnavailable = html.includes(UNAVAILABLE_TEXT);
        const status = isUnavailable ? 'Not available yet' : 'Can order now';

        // Send message to Telegram
        await bot.sendMessage(CHAT_ID, `iPad Mini Status: ${status}`);
        console.log(`Status checked at ${new Date().toLocaleString()}: ${status}`);
    } catch (error) {
        console.error('Error checking availability:', error);
        try {
            await bot.sendMessage(CHAT_ID, 'Error checking iPad Mini availability');
        } catch (telegramError) {
            console.error('Error sending Telegram message:', telegramError);
        }
    }
}

exports.main = async (args) => {
    console.log('Starting iPad Mini availability check...');
    await checkAvailability();
    console.log('iPad Mini availability check completed.');

    return {
        headers: { 'content-type': 'text/plain; charset=UTF-8' },
        body: 'iPad Mini availability check completed.'
    };
}
