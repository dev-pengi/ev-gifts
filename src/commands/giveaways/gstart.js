const Discord = require('discord.js');
module.exports = {
    name: "start",
    description: "",
    permissions: {
        user: `MANAGE_CHANNELS`,
    },
    category: 'Moderation',
    async run(message, args, client, emo) {

        if (!args[0] || !args[1] || !args[2]) {
             return message.reply(`${emo.prefix}s [time] [winners] [prize]`)
        }

        time = args[0]
        winnersCount = args[1]
        prize = message.content.split(' ').slice(3).join(' ')
        timeExtention = time.split('')[time.length - 1]
        timeN = time.slice(0, -1);

        if (timeExtention != `s` && timeExtention != `m` && timeExtention != `h` && timeExtention != `d`) {
            return message.reply(`${emo.prefix}s \`[time]\` [winners] [prize]`)
        }
        if (isNaN(timeN)) {
            return message.reply(`${emo.prefix}s \`[time]\` [winners] [prize]`)
        }
        if (isNaN(winnersCount)) {
            return message.reply(`${emo.prefix}s [time] \`[winners]\` [prize]`)
        }

        if (timeExtention == `s`) {
            timeN *= 1000;
        }
        else if (timeExtention == `m`) {
            timeN *= (1000 * 60);
        }
        else if (timeExtention == `h`) {
            timeN *= (1000 * 60 * 60);
        }
        else if (timeExtention == `d`) {
            timeN *= (1000 * 60 * 60 * 24);
        }
        else if (timeExtention == `w`) {
            timeN *= (1000 * 60 * 60 * 24 * 7);
        }
        if (timeN >= 1209400000) {
            timeN = 1200000000
        }
        message.delete().catch()






        const embed = new Discord.MessageEmbed()
            .setColor(`${emo.embedcolor}`)
            .setDescription(`React with ${emo.tada} to enter`)
            .addField(`${emo.time} End's`, `<t:${parseInt(((Date.now() + timeN)/1000),10)}:R>`)
            .addField(`${emo.gift} Prize`, `${prize}`)
            .setFooter({ text: `${winnersCount} Winners` })
            .setTimestamp((Date.now() + timeN))
            if (message.author.avatarURL({ dynamic: true }))
            {  
                embed.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}`})
            }

            message.channel.send({embeds : [embed]})
            .then(async msg=>{
                msg.react(`${emo.tada}`)
                setTimeout(async () => {

                    if (!msg.reactions) return;
                    const { users } = await msg.reactions.cache.first().fetch();
                    const reaUsers = await users.fetch();
                    const possiblewinners = [];
                    reaUsers.forEach(user =>{
                        possiblewinners.push(user);
                    })
                    if (possiblewinners.length - 1 < winnersCount) return;
                    const winners = [];
                    let i = 0;
                    while (i < winnersCount) {
                        let winner = possiblewinners[getRnd(0,possiblewinners.length)];
                        if (winner.id == client.user.id) continue;
                        if (winners.includes(`<@${winner.id}>`)) continue;
                        winners.push(`<@${winner.id}>`)
                        i++

                    }
                    msg.channel.send(`Congratulations ${winners.join(', ')}. You won the **${prize}**`).catch()
                    const embedEdited = new Discord.MessageEmbed()
                    .setColor(`${emo.embedcolor}`)
                    .setDescription(`${emo.time} giveaway ended`)
                    .addField(`${emo.tada} Winners`, `${winners.join(', ')}`)
                    .addField(`${emo.gift} Prize`, `${prize}`)
                    .setFooter({ text: `${winnersCount} Winners` })
                    .setTimestamp()
                    if (message.author.avatarURL({ dynamic: true }))
                    {  
                        embed.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}`})
                    }
                    msg.edit({embeds:[embedEdited]})

                    
                }, timeN);
            })
            .catch()


            function getRnd(min,max)
            {
                return Math.floor(Math.random() * (max-min)) + min
            }

    }
}