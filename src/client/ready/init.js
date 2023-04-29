const colors = require('colors');
module.exports = async (client) => {
    client.user.setPresence({
        status: 'idle',
    })
    const loadCommands = async (guild) => {
        try {
            const load = await guild.commands.set(client.slash)
            console.log(`loaded slash commands in ${guild.name}`.gray)
            return load;
        } catch (err) {
            console.log(err);
        }
    }
    // client.guilds.cache.map(guild => loadCommands(guild))
}