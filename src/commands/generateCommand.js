const telegramService = require("../services/telegramService");
const imageGenerationService = require("../services/imageGenerationService");
const { Readable } = require("stream");

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const prompt = match[1];

  try {
    let modelOptions = [
      [
        {
          text: "FLUX.1-dev",
          callback_data: "black-forest-labs/FLUX.1-dev",
        },
      ],
      [
        {
          text: "FLUX.1-schnell",
          callback_data: "black-forest-labs/FLUX.1-schnell",
        },
      ],
    ];

    await telegramService.sendMessage(chatId, "Choose a model\n", {
      reply_to_message_id: messageId || null,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: modelOptions,
      },
    });

    telegramService.bot.on("callback_query", async (callbackQuery) => {
      await telegramService.bot.answerCallbackQuery(callbackQuery.id);
      let botMessageId = callbackQuery.message.message_id;
      let selectedModel = callbackQuery.data;
      await telegramService.editMessageReplyMarkup(chatId, botMessageId, {
        inline_keyboard: [],
      });
      await telegramService.editMessageText(
        chatId,
        botMessageId,
        "Model selected: " +
          selectedModel.split("/")[1] +
          "\nGeneration in progress..."
      );
      const imageBuffer = await imageGenerationService.generateImage(prompt, {
        model: callbackQuery.data,
      });
      await telegramService.sendPhoto(chatId, imageBuffer, {
        caption: "Generated image for " + msg.from.first_name,
        parse_mode: "Markdown",
        reply_to_message_id: messageId || null,
      });
      await telegramService.deleteMessage(chatId, callbackQuery.message.message_id);
    });

    // let sizeOptions = [
    //   [{ text: "512x512", callback_data: `${selectedModel}_512x512` }],
    //   [{ text: "1024x1024", callback_data: `${selectedModel}_1024x1024` }],
    // ];
    // console.log(selectedModel, callbackQuery.message.message_id);
    // await telegramService.editMessageText(
    //   chatId,
    //   botMessageId,
    //   "Choose a resolution"
    // );
    // await telegramService.editMessageReplyMarkup(chatId, botMessageId, {
    //   inline_keyboard: sizeOptions,
    // });

    // const generatingMessage = await telegramService.sendMessage(
    //   chatId,
    //   "Generating Image",
    //   {
    //     reply_to_message_id: messageId || null,
    //     parse_mode: "Markdown",
    //   }
    // );

    // const imageBuffer = await imageGenerationService.generateImage(prompt);
    // Send the image
    // await telegramService.sendPhoto(chatId, imageBuffer, {
    //   caption: "Generated image for " + msg.from.first_name,
    //   parse_mode: "Markdown",
    //   reply_to_message_id: messageId || null,
    // });

    // Delete the generating message after sending the image
    // await telegramService.deleteMessage(chatId, generatingMessage.message_id);
  } catch (error) {
    // console.error('Error generating image:', error);
    await telegramService.sendMessage(
      chatId,
      "Sorry, there was an error generating the image.\n" + error,
      {
        reply_to_message_id: messageId || null,
        parse_mode: "Markdown",
      }
    );
  }
};
