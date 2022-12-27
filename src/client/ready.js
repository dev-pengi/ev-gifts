const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = async (client) => {
    console.log(
        `\nconnected to: ${client.user.tag}`,
    )
    client.user.setActivity('discord.gg/ev', { type: 'WATCHING' });
}