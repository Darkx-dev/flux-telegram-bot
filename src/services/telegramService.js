const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/config');

class TelegramService {
  constructor() {
    this.bot = new TelegramBot(config.telegramToken, { polling: true });
  }

  addCommand(command, callback) {
    this.bot.onText(command, callback);
  }

  sendMessage(chatId, message) {
    return this.bot.sendMessage(chatId, message);
  }

  sendPhoto(chatId, photo, options) {
    return this.bot.sendPhoto(chatId, photo, options);
  }
}

module.exports = new TelegramService();