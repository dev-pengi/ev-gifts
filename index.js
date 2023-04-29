console.clear();
require('dotenv').config()

//Discord
const { Client, Intents } = require('discord.js')

const intents = new Intents(32767);
const client = new Client({ intents });

//Events
const connections = require('./events/connection')
const handler = require('./handler')


//Errors handler
process.on("unhandledRejection", err => {
    console.log(err)
})
process.on("uncaughtException", (err, origin) => {
    console.log("Caught exception: " + err)
    console.log("🟥 Origin: " + origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(err);
    console.log("🟥 Origin: " + origin)
});
process.on('multipleResolves', (type, promise, reason) => {
    console.log(type, promise);
});

// execute events
connections(client)
handler(client);