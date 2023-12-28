const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6372105023:AAENq18ynY1CIpQI7QCUZRkT9UD3aL2AWNE', { polling: true });
const channelUsername = '@crbdsm';
const errorChanel = '@errocrbdsm';
const moment = require("moment")
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

const client3 = new Redis({
  host: '31.40.4.226',
  port: 6379,
  password: "",
});


async function makeMessage(key, data, server) {
  const changedData = JSON.parse(data)
  const originalDateTime = moment(changedData["1m"][0].t);
  const updatedDateTime = originalDateTime.add(3, 'hours').add(30, 'minutes');
  const formattedUpdatedDateTime = updatedDateTime.format('YYYY-MM-DD HH:mm:ss');

  return `✅ ${server} Server 
  ${key} : ${changedData["1m"][0].c} 
  Time: ${formattedUpdatedDateTime} `
}



async function sendMessage(channelUsername, message) {
  // Send a message to the channel
  await bot.sendMessage(channelUsername, message)

}

async function getRedisData(key, client, serverName) {
  const data = await client.get(key)
  if (data != null) {
    const message = await makeMessage(key.toUpperCase(), data, serverName)
    sendMessage(channelUsername, message)
    console.log(` ${message} `)

  } else {
    sendMessage(channelUsername, `❌❌❌❌❌${serverName} is deactive ❌❌❌❌❌`)
    sendMessage(errorChanel, `❌❌❌❌❌${serverName} is deactive ❌❌❌❌❌`)
    console.log(`${serverName} is deactive ❌`)

  }
}


await getRedisData("status", client3, "Bourse")

// setInterval(async () => {
//   await getRedisData("btcusdt", client1, "NVME")
//   await getRedisData("btcusdt", client2, "SATA")
//   await getRedisData("status", client3, "Bourse")
// }, 60000);













