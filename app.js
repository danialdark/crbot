const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the actual token you obtained from the BotFather
const bot = new TelegramBot('6372105023:AAENq18ynY1CIpQI7QCUZRkT9UD3aL2AWNE', { polling: true });

// Replace '@your_channel_username' with your channel username
const channelUsername = '@crtrest';

// Send a message to the channel
bot.sendMessage(channelUsername, 'Hello, this is a test message!')
  .then(message => console.log('Message sent:', message))
  .catch(error => console.error('Error:', error));
