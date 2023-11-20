const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6372105023:AAENq18ynY1CIpQI7QCUZRkT9UD3aL2AWNE', { polling: true });
const channelUsername = '@crtrest';

const Redis = require('ioredis');

// Connect to the first Redis server
const client1 = new Redis({
  host: '95.217.151.65',
  port: 6379,
  password: "D@n!@l12098",
});


const client2 = new Redis({
  host: '157.90.39.38',
  port: 6379,
  password: "D@n!@l12098",
});



async function sendMessage() {
  // Send a message to the channel
  await bot.sendMessage(channelUsername, message)

}

async function getRedisData(key, client, serverName) {
  const data = await client.get(key)
  if (data != null) {
    sendMessage(channelUsername, `${serverName} is active`)
  } else {
    sendMessage(channelUsername, `***********${serverName} is deactive*******`)
  }
}



setInterval(() => {
  getRedisData("btcusdt", client1, "nvmeData")
  getRedisData("btcusdt", client2, "sataData")
}, 60000);













