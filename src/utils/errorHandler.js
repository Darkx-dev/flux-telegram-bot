const telegramService = require('../services/telegramService');

class ErrorHandler {
  handleError(error, chatId = null) {
    console.error('An error occurred:', error);

    if (chatId) {
      telegramService.sendMessage(chatId, 'An unexpected error occurred. Please try again later.');
    }

    // You could add more sophisticated error handling here, such as:
    // - Sending errors to a logging service
    // - Notifying developers of critical errors
    // - Attempting to recover from certain types of errors
  }
}

module.exports = new ErrorHandler();