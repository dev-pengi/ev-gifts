const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { checkCommandModule, checkProperties } = require('./events/validData');
const colors = require('colors');

module.exports = (client) => {

    client.commands = new Collection()
    client.buttons = new Collection()

    const commandsDirectory = './src/commands/';
    const clientDirectory = './src/client/';
    
    async function loadCommands(client) {
      const commandFolders = await getFolders(commandsDirectory);
      for (const folder of commandFolders) {
        const commandFiles = await getFiles(`${commandsDirectory}${folder}/`);
        for (const file of commandFiles) {
          const commandName = getCommandName(file);
          const commandModule = require(`./src/commands/${folder}/${file}`);
          if (checkCommandModule(commandName, commandModule) && checkProperties(commandName, commandModule)) {
              client.commands.set(commandModule.name, commandModule);
          }
          console.log(`Loaded command [${commandName}]`.green);
        }
      }
    }


    async function loadEvents(client) {
      const eventFolders = await getFolders(clientDirectory);
      for (const folder of eventFolders) {
        const eventFiles = await getFiles(`${clientDirectory}${folder}/`);
        const eventName = folder;
        for (const file of eventFiles) {
          const event = require(`./src/client/${folder}/${file}`);
          client.on(eventName, event.bind(null, client));
          console.log(`Loaded event [${eventName}]`.green);
        }
      }
    }
    
    async function getFolders(directory) {
      try {
        const folders = await fs.promises.readdir(directory);
        return folders.filter(folder => folder !== null);
      } catch (err) {
        console.error(`Error reading directory: ${directory}`, err);
        return [];
      }
    }
    
    async function getFiles(directory) {
      try {
        return await fs.promises.readdir(directory);
      } catch (err) {
        console.error(`Error reading directory: ${directory}`, err);
        return [];
      }
    }
    
    function getCommandName(file) {
      return file.split('.')[0];
    }
    
    loadCommands(client);
    loadEvents(client);
    

}