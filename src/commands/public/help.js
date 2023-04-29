const { embedColor, prefix } = require('../../../config/config.json')
module.exports = {
    name: "help",
    description: "",
    async run(message, args, client) {
        const embed = {
            color: embedColor,
            title: `${client.user.username} Commands`,
            thumbnail: { url: client.user.displayAvatarURL() },
            author: { name: `${client.user.username}`, icon_url: client.user.displayAvatarURL() },
            fields: [
                {
                    name: `> ${prefix}start`,
                    value: `to start a new giveaway`,
                },
                {
                    name: `> ${prefix}info`,
                    value: `to get information about the bot`,
                },
                {
                    name: `> ${prefix}help:`,
                    value: `to get the bots command menu`,
                },
            ],
        }

        message.reply({ embeds: [embed] })
    }
}