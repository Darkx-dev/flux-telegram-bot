const telegramService = require("../services/telegramService");
const imageGenerationService = require("../services/imageGenerationService");
const { Readable } = require("stream");

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const prompt = match[1];

  try {
    await telegramService.sendMessage(
      chatId,
      "Generating image, please wait..."
    );

    const imageBuffer = await imageGenerationService.generateImage(prompt);

    // Send the image
    await telegramService.sendPhoto(chatId, imageBuffer, {
      caption: `Generated image for: ${prompt}`,
      reply_to_message_id: messageId || null,
      parse_mode: "Markdown",
    });
    await telegramService.sendMessage(chatId, "Ye le bsdk dekh ab", messageId);
  } catch (error) {
    // console.error('Error generating image:', error);
    await telegramService.sendMessage(
      chatId,
      "Sorry, there was an error generating the image. Please try again later." +
        error
    );
  }
};
