require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});


module.exports = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  huggingFaceToken: process.env.HUGGING_FACE_API_TOKEN,
  huggingFaceModelUrl:
    "https://api-inference.huggingface.co/models/",
};
