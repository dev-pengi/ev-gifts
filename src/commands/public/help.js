const Discord = require('discord.js');
module.exports = {
  name: "help",
  description: "",
  category: 'Public',
  async run(message, args, client, emo) {

    const embed = new Discord.MessageEmbed()
      .setColor(`${emo.embedcolor}`)
      .setTitle(`${client.user.username} Commands`)
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
      .setFooter(`${message.guild.name}`)
      message.reply({content : `**the bot prefix is : \`${emo.prefix}\`**`,embeds:[embed]})



  }
}