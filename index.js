console.clear();
require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs');
const { checkCommandModule, checkProperties } = require('./events/validData'); 

const prefix = '!'

let emo = {
  time: '<:ev_039:1051163648216805587>',
  warning : '<:ev_038:1051163644525817906>',
  true: '<:ev_018:1051163570672500766>',
  false: '<:ev_021:1051163582055845898>',
  gift: '<:ev_000:1051163504880660673>',
  tada: '<:ev_011:1051163544835604562>',
  embedcolor : '#1f1f1f',
  prefix: prefix,
}

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("🟥 Reason: " + reason)
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




const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
  
client.commands = new Discord.Collection()   
 
 


fs.readdir('./src/commands', (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(`./src/commands/${folder}`, (err, files) => {
      if (err) return
      files.forEach(file => {
        let cmdName = file.split('.')[0],
          cmdModule = require(`./src/commands/${folder}/${file}`)
        if (checkCommandModule(cmdName, cmdModule)) {
          if (checkProperties(cmdName, cmdModule)) {
            //  console.log(cmdModule)
            client.commands.set(cmdModule.name, cmdModule)
          }
        }
        console.log(`Setting up ${folder} command {${cmdName}}`);
      })
    })
  })
}) 
client.on('messageCreate', async message => {
  const [cmd] = message.content.split(' ');
  if (message.author.bot) return;
  client.commands.find(command => {
    if (`${prefix}${command.name.toLowerCase()}` == `${cmd.slice(0).toLowerCase()}` && !command.name.startsWith('$P') || command.aliases && command.aliases.includes(cmd.slice(0).toLowerCase()) && !command.name.startsWith('$P')) {
      const args = message.content.slice(cmd.slice(0).length).trim().split(/ +/);
      if (command.permissions)
      {
        if (!message.member.permissions.has(command.permissions.user)) return message.reply(`**${emo.warning} - you don't have permission to use that command**`);
        if (!message.guild.members.cache.get(`${client.user.id}`).permissions.has(command.permissions.bot)) return message.reply(`**${emo.warning} - i don't have permission to excute that command**`);
      }
      command.run(message, args, client,emo)
    }
  });
})
// Client Events Handler
fs.readdir('./src/client/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./src/client/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    console.log(`Setting up event {${eventName}}`);
  });
});

//------------------------------------------File Readder----------------------------------------


//

client.login(process.env.TOKEN)