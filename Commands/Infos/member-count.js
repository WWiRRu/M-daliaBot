const Discord = require("discord.js")

module.exports = {

  name: "member-count",
  description: "Permet d'afficher le nombre total de membre",
  permission: "Aucune",
  dm: false,
  category: "Information",

  async run(bot, message, args) {

    const EmbedMemberCount = new Discord.EmbedBuilder()
    .setColor(bot.config.Informations.color)
    .addFields({ name: "Membres totaux :", value: `👥 ${message.guild.memberCount}`, inline: false })
    .addFields({ name: "Humains :", value: `👤 ${message.guild.members.cache.filter(member => !member.user.bot).size}`, inline: true })
    .addFields({ name: "Bots :", value: `🤖 ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: true })
    .addFields({ name: "Membres en vocal:", value: `🎙️ ${message.guild.members.cache.filter(m => m.voice.channel).size}`, inline: true})
    await message.reply({embeds: [EmbedMemberCount]})
  }
}