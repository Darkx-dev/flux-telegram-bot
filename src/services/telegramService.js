const TelegramBot = require("node-telegram-bot-api");
const config = require("../config/config");

class TelegramService {
  constructor() {
    this.bot = new TelegramBot(config.telegramToken, { polling: true });
  }

  addCommand(command, callback) {
    this.bot.onText(command, callback);
  }

  sendMessage(chatId, message, options) {
    return this.bot.sendMessage(chatId, message, options);
  }

  deleteMessage(chatId, messageId) {
    return this.bot.deleteMessage(chatId, messageId);
  }

  editMessageText(chatId, messageId, updatedText) {
    return this.bot.editMessageText(updatedText, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "Markdown",
    });
  }

  editMessageReplyMarkup(chatId, messageId, updatedMarkup) {
    return this.bot.editMessageReplyMarkup(updatedMarkup, {
      chat_id: chatId,
      message_id: messageId,
    });
  }

  sendPhoto(chatId, photo, options) {
    return this.bot.sendPhoto(chatId, photo, options);
  }
}

module.exports = new TelegramService();
