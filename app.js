const TelegramBot = require('node-telegram-bot-api');
// Replace 'YOUR_BOT_TOKEN' with the actual token you obtained from the BotFather
const bot = new TelegramBot('6372105023:AAENq18ynY1CIpQI7QCUZRkT9UD3aL2AWNE', { polling: true });

// Replace '@your_channel_username' with your channel username
const channelUsername = '@crtrest';
const redis = require('redis');

// Create connections to the three Redis instances
const nvmeGerman = redis.createClient({ host: '157.90.39.38', port: 6379, password: 'D@n!@l12098', enableCompression: true });
const sataGerman = redis.createClient({ host: '31.40.4.226', port: 6379, password: 'D@n!@l12098', enableCompression: true });


// Example keys to retrieve from each Redis instance
const nvmeGermanKey = 'btcusdt';
const sataGermanKey = 'btcusdt';


// Function to get data from Redis and log the result
function getDataFromRedis(client, key) {
  return new Promise((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}


async function fetchData() {
  // Create Redis clients for each server
  const client1 = redis.createClient(nvmeGerman);
  const client2 = redis.createClient(sataGerman);

  try {
    const data1 = await getDataFromRedis(client1, nvmeGermanKey);
    await sendMessageAsync("nvme is live")

    const data2 = await getDataFromRedis(client2, sataGermanKey);
    await sendMessageAsync("sata is live")

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    // Quit the Redis connections
    client1.quit();
    client2.quit();

  }
}


setInterval(() => {
  fetchData()
}, 5000);


async function sendMessageAsync(myMessage) {
  try {
    // Send a message to the channel
    const message = await bot.sendMessage(channelUsername, myMessage);
    // console.log('Message sent:', message);
  } catch (error) {
    console.error('Error:', error);
  }
}