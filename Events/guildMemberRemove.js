const Discord = require("discord.js");

module.exports = (bot, member) => {
    const EmbedMessage  = new Discord.EmbedBuilder()
    .setTitle(bot.config.Informations.servername)
    .setColor('#e06666')
    .setDescription(`± Un membre vient de nous quitter!\n± Nombre de membres: **${member.guild.members.cache.filter(member => !member.user.bot).size}**\n± <@${member.user.id}> vient de quitter ${bot.config.Informations.servername}!\u200B \n± A bientôt!`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    let channelss = bot.channels.cache.get(bot.config.Arrivages.OutcommingID)
    channelss.send({ embeds: [EmbedMessage]})
}