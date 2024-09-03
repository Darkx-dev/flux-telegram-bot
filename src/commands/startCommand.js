const telegramService = require("../services/telegramService");

module.exports = async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const welcomeMessage = `
Hello ${firstName}! 👋

Welcome to the Image Generation Bot. Here's how you can use me:

1. Generate an image:
   Send: /generate [your description]
   Example: /generate a cute cat playing piano

2. Help:
   Send: /help to see this message again.

Have fun generating images! 🎨🖼️
  `;

  await telegramService.sendMessage(chatId, welcomeMessage);
};
