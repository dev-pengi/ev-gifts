const { embedReply } = require('../../../events/tools')
const { emojis, embedColor, errorColor } = require('../../../config/config.json')
const { math, time, random, arrays } = require('utils-core.js');
const Discord = require('discord.js')
module.exports = {
    name: "start",
    description: "",
    permissions: {
        user: `MANAGE_CHANNELS`,
    },
    async run(message, args, client) {

        if (!args[0]) {
            return embedReply({
                message,
                content: `Please provide the giveaway's time`,
                bold: true,
                error: true,
                emoji: emojis.false
            })
        }
        if (!args[1]) {
            return embedReply({
                message,
                content: `Please provide the winners count`,
                bold: true,
                error: true,
                emoji: emojis.false
            })
        }
        if (!args[2]) {
            return embedReply({
                message,
                content: `Please provide the giveaway's prize`,
                bold: true,
                error: true,
                emoji: emojis.false
            })
        }

        let timeArg = args[0]
        let winnersCount = args[1]
        let prize = message.content.split(' ').slice(3).join(' ')
        if (isNaN(winnersCount) || winnersCount <= 0)
            return embedReply({
                message,
                content: `Please provide a valid winners count`,
                bold: true,
                error: true,
                emoji: emojis.false
            })

        let timeMs = 0;
        try {
            timeMs = time.StringToMs(timeArg);
            timeMs = math.clamp(timeMs, time.StringToMs('1s'), time.StringToMs('14d'))
        } catch (err) {
            console.log(err)
            return embedReply({
                message,
                content: `Please provide a valid time for the giveaway`,
                bold: true,
                error: true,
                emoji: emojis.false
            })
        }

        message.delete();

        let description = [
            `${emojis.dot} **React with ${emojis.tada} to enter the giveaway**`,
            `${emojis.dot} **Ends:** <t:${parseInt(((Date.now() + timeMs) / 1000), 10)}:R>`,
            `${emojis.dot} **Hosted by:** <@!${message.author.id}>`,
        ].join(`\n`)
        const footer = { text: `${winnersCount} ${winnersCount > 10 ? `Winners` : `Winner`}` };

        let embed = {
            title: `${prize}`,
            color: `${embedColor}`,
            description,
            footer,
            timestamp: Date.now() + timeMs,
        }

        try {
            const msg = await message.channel.send({ embeds: [embed] });
            await msg.react(`${emojis.tada}`);

            const pickWinner = async () => {
                const { users } = await msg.reactions.cache.first().fetch();
                let reactionUsers = await users.fetch();
                reactionUsers = arrays.extract(reactionUsers, `id`).filter(user => user != client.user.id)

                if (reactionUsers.length >= winnersCount) {
                    const winners = [];
                    for (let i = 0; i < winnersCount; i++) {
                        let winner = random.getRandomItem(reactionUsers);
                        if (winners.includes(winner)) continue;
                        winners.push(winner)
                    }
                    const winnersString = winners.map(win => `<@!${win}>`).join(', ');

                    msg.channel.send({
                        content: `**Congrats ${winnersString} | You Won \`${prize}\` ${emojis.gift} .**`
                    })
                    description = [
                        `${emojis.dot} **Winners:** ${winnersString}`,
                        `${emojis.dot} **Prize:** ${prize}`,
                        `${emojis.dot} **Hosted by:** <@!${message.author.id}>`,
                    ].join(`\n`)
                    embed = {
                        title: `Giveaway ended`,
                        color: `${embedColor}`,
                        description: description,
                        footer,
                        timestamp: Date.now(),
                    }
                    msg.edit({ embeds: [embed] })
                }
                else {
                    description = [
                        `${emojis.dot} The giveaway ended and I can't select a winner`,
                        `${emojis.dot} **Hosted by:** <@!${message.author.id}>`,
                    ].join(`\n`)
                    embed = {
                        title: `Giveaway ended`,
                        color: `${errorColor}`,
                        description: description,
                        footer,
                        timestamp: Date.now(),
                    }

                    await msg.edit({ embeds: [embed] })
                    await msg.reactions.removeAll()
                }
            }
            setTimeout(pickWinner, timeMs);
        } catch (err) {
            console.log(err);
        }



    }
}