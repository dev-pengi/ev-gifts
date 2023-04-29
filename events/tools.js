const config = require('../config/config.json')
const moment = require('moment')

/**
 * Sends an interaction response as an embed
 * @param {Object} options - Options object
 * @param {Object} options.interaction - The interaction object
 * @param {string} options.content - The content of the embed
 * @param {boolean} options.ephemeral - Whether the message should be ephemeral (only visible to the user who triggered the interaction)
 * @param {boolean} options.error - Whether the embed should use an error color
 * @returns {Promise} - A Promise that resolves to the sent message
 * @throws {Error} - If invalid options are provided or if there is an error sending the message
 */

const interactionEmbed = async ({ interaction, content, ephemeral, error, bold, emoji }) => {
    if (!interaction) throw new Error(`Invalid interaction`);
    if (!content.trim().length) return new Error(`Message cannot be empty`);
    if (emoji) content = `${emoji} | ${content}`
    if (bold) content = `**${content}**`

    const color = error ? `#dd0000` : config.embedColor;
    const embed = {
        description: content,
        color: color,
    };

    try {
        const result = await interaction.reply({ embeds: [embed], ephemeral: ephemeral })
        return result;
    } catch (err) {
        throw new Error(err.message)
    }
}

const interactionEmbedEdit = async ({ interaction, content, error, bold, emoji }) => {
    if (!interaction) throw new Error(`Invalid interaction`);
    if (!content.trim().length) return new Error(`Message cannot be empty`);
    if (emoji) content = `${emoji} | ${content}`
    if (bold) content = `**${content}**`

    const color = error ? `#dd0000` : config.embedColor;
    const embed = {
        description: content,
        color: color,
    };

    try {
        const result = await interaction.editReply({ embeds: [embed] })
        return result;
    } catch (err) {
        throw new Error(err)
    }
}


/**
 * Sends a message to a channel as an embed
 * @param {Object} options - Options object
 * @param {Object} options.channel - The channel object to send the message to
 * @param {string} [options.content=''] - The content of the embed
 * @param {boolean} options.error - Whether the embed should use an error color
 * @returns {Promise} - A Promise that resolves to the sent message
 * @throws {Error} - If invalid options are provided or if there is an error sending the message
 */
const embed = async ({ channel, content = '', error, bold, emoji }) => {
    if (!channel) throw new Error(`Invalid channel`);
    if (!content.trim().length) return new Error(`Message cannot be empty`);
    if (emoji) content = `${emoji} | ${content}`
    if (bold) content = `**${content}**`

    const color = error ? config.errorColor : config.embedColor;

    const embed = {
        description: content,
        color,
    };

    try {
        const result = await channel.send({ embeds: [embed] })
        return result;
    } catch (err) {
        throw new Error(err.message)
    }
}
/**
 * Sends an embed as a reply to a message
 * @param {Object} options - Options object
 * @param {Object} options.message - The message object to reply to
 * @param {string} options.content - The content of the embed
 * @param {boolean} options.mention - Whether to mention the user in the reply
 * @param {boolean} options.error - Whether the embed should use an error color
 * @returns {Promise} - A Promise that resolves to the sent message
 * @throws {Error} - If invalid options are provided or if there is an error sending the message
 */

const embedReply = async ({ message, content, error, bold, emoji }) => {
    if (!message) throw new Error(`Invalid message`);
    if (!content.trim().length) return new Error(`Message cannot be empty`);
    if (emoji) content = `${emoji} | ${content}`
    if (bold) content = `**${content}**`

    const color = error ? config.errorColor : config.embedColor;
    const embed = {
        description: content,
        color,
    };

    try {
        const result = await message.reply({ embeds: [embed] })
        return result;
    } catch (err) {
        throw new Error(err.message)
    }
}
const embedEdit = async ({ message, content, error, bold, emoji }) => {
    if (!message) throw new Error(`Invalid message`);
    if (!content.trim().length) return new Error(`Message cannot be empty`);
    if (emoji) content = `${emoji} | ${content}`
    if (bold) content = `**${content}**`

    const color = error ? config.errorColor : config.embedColor;
    const embed = {
        description: content,
        color,
    };

    try {
        const result = await message.edit({ embeds: [embed], allowedMentions: { repliedUser: mention } })
        return result;
    } catch (err) {
        throw new Error(err.message)
    }
}




function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


module.exports = {
    interactionEmbed,
    interactionEmbedEdit,
    embed,
    embedReply,
    embedEdit,
    wait,
};
