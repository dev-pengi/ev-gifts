const Discord = require('discord.js');
module.exports = {
    name: "info",
    description: "",
    category: 'Moderation',
    async run(message, args, client, emo) {
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        const used = process.memoryUsage().heapUsed / 1024 / 1024; 
        let infoEmbed = new Discord.MessageEmbed()
            .setColor(emo.embedcolor)
            .setTitle('Ev gifts info')
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })

            .addField("Time Taken:", `${Date.now() - message.createdTimestamp}ms`)
            .addField("API Latency:", `${Math.round(client.ws.ping)}ms`)
            .addField("Servers:", `${client.guilds.cache.size} server`)
            .addField("Users:", `${client.users.cache.size} user`)
            .setFooter({text:'بطريق وقت الضيق'})

            message.reply({embeds: [infoEmbed]}).catche

    }
}