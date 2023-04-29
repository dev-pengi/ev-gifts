const { embedColor } = require('../../../config/config.json')
module.exports = {
    name: "info",
    description: "",
    async run(message, args, client) {

        const embed = {
            color: embedColor,
            title: 'Ev gifts info',
            thumbnail: { url: client.user.displayAvatarURL() },
            fields: [
                {
                    name: 'Time Taken:',
                    value: `${Date.now() - message.createdTimestamp}ms`,
                    inline: true,
                },
                {
                    name: 'API Latency:',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true,
                },
                {
                    name: 'Servers:',
                    value: `${client.guilds.cache.size} server`,
                    inline: true,
                },
                {
                    name: 'Users:',
                    value: `${client.users.cache.size} user`,
                    inline: true,
                },
            ],
        }

        message.reply({ embeds: [embed] })
    }
}