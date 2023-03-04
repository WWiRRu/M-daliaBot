const Discord = require('discord.js')
const libquery = require('libquery')

module.exports = {

  name: "ip",
  description: "Permet d'avoir l'ip du serveur",
  permission: "Aucune",
  dm: true,
  category: "Information",

async run(bot, message, args) {
    libquery.query(bot.config.Serveur.Ip, bot.config.Serveur.Port, 1000).then((data) => {
        const onembed = new Discord.EmbedBuilder()
        .setTitle(bot.config.Informations.servername)
        .setColor(bot.config.Informations.color)
        .setDescription(`> 📡 | Statut: **Online (🟢)**
        > 📌 | IP: **${bot.config.Serveur.Ip}**
        > 🔗 | Port: **19132**
        > 👥 | Nombre de joueur en ligne: **${data.online}/${data.max}**
		> ⚙️| Version du serveur: **${data.version}**
        > ✏ | MOTD: **${data.motd}**`)
        .setTimestamp()

        message.reply({ embeds: [onembed] })
    }).catch(() => {
        const offembed = new Discord.EmbedBuilder()
        .setTitle(bot.config.Informations.servername)
        .setColor(bot.config.Informations.color)
        .setDescription(`> 📡 | Statut: **Offline (🔴)**
        > 📌 | IP: **${bot.config.Serveur.ip}**
        > 🔗 | Port: **19132**
        > 👥 | Nombre de joueur en ligne: **??/??**
		> ⚙️ | Version du serveur: **v??.??.??**
        > ✏ | MOTD: ??`)
        .setTimestamp()
        message.reply({ embeds: [offembed] })
            });
  }
}
