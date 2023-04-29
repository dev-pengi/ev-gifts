const { prefix, emojis } = require('../../../config/config.json')
const tools = require('../../../events/tools')

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const [commandName, ...args] = message.content.slice(0).trim().split(/ +/);

    const command = client.commands.find(cmd => (
        (prefix + cmd.name.toLowerCase() === commandName.toLowerCase()) || (cmd.aliases && cmd.aliases.includes(commandName.toLowerCase()))
    ));

    if (!command) return;

    const { id } = message.author;
    const { permissions, roles, specifics } = command;

    if (specifics) {
        if (specifics.includes(id))
            return runCommand();
        else
            return false;
    }

    if (roles) {
        const hasRoleOrAdmin = message.guild.members.cache.get(id).roles.cache.some(role => roles.includes(role.id)) ||
            message.guild.members.cache.get(id).permissions.has('ADMINISTRATOR');
        if (!hasRoleOrAdmin) return;
    }
    if (permissions) {
        const member = message.member;
        const botId = client.user.id;
        if (permissions.user && !member.permissions.has(permissions.user)) return;

        if (permissions.bot && !message.guild.members.me.permissions.has(`${permissions.bot}`)) {
            return tools.embedReply({
                message,
                content: `احتاج الى صلاحية \`${permissions.bot}\` من اجل تنفيذ هذا الامر`,
                bold: true,
                emoji: emojis.false,
                error: true
            })
        }
    }
    runCommand();


    function runCommand() {
        return command.run(message, args, client);
    }
}

