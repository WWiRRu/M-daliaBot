const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
  name: "serverinfo",
  description: "Permet d'avoir les informations du serveur",
  permission: "Aucune",
  dm: false,
  category: "Information",

  async run(bot, message, args) {let SIEmbed = new Discord.EmbedBuilder()
    .setColor(bot.config.Informations.color)
    .setTitle(`Informations sur le serveur ${message.guild.name}`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setDescription(`***Informations sur le serveur***\n**Nom** : ${message.guild.name}\n**Propriétaire** : ${(await message.guild.fetchOwner())}\n**ID** : ${message.guild.id}\n**Description** : ${message.guild.description ? message.guild.description : "Aucune"}\n**Boost** : ${message.guild.premiumSubscriptionCount} (${message.guild.premiumTier})\n**Date de création** : \n <t:${Math.floor(message.guild.createdAt / 1000)}:F>\n***Informations sur les stats***\n**Salons** : ${message.guild.channels.cache.size}\n**Rôles** : ${message.guild.roles.cache.size}\n**Emojis** : ${message.guild.emojis.cache.size}\n**Membres** : ${message.guild.members.cache.size}\n***Informations sur les salons spéciaux***\n**Règlement** : ${message.guild.rulesChannel ? message.guild.rulesChannel : "Aucun"}\n**AFK** : ${message.guild.afkChannel ? message.guild.rulesChannel : "Aucun"}`)
    .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
    .setTimestamp()
    message.reply({ embeds: [SIEmbed] })
  } 
}