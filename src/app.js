const telegramService = require('./services/telegramService');
const startCommand = require('./commands/startCommand');
const generateCommand = require('./commands/generateCommand');
const errorHandler = require('./utils/errorHandler');

// Register commands
telegramService.addCommand(/\/start/, startCommand);
telegramService.addCommand(/\/generate (.+)/, generateCommand);

// Add a help command that's identical to start
telegramService.addCommand(/\/help/, startCommand);

// Global error handling
process.on('unhandledRejection', (error) => {
  errorHandler.handleError(error); 
});

console.log('Bot is running...');