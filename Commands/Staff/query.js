const Discord = require('discord.js')
const libquery = require('libquery')

module.exports = {

  name: "query",
  description: "Permet d'avoir les informations d'un serveur",
  permission: "Aucune",
  dm: true,
  category: "Information",
  options: [
      {
      type: "string",
      name: "ip",
      description: "Ip a query",
      required: true,
      autocomplete: false
      },
      {
        type: "string",
        name: "port",
        description: "Port a query",
        required: false,
        autocomplete: false
      }
  ],

async run(bot, message, args) {
    let ipstring = args.getString("ip");
    let portstring = args.getString("port") || "19132";
    libquery.query(ipstring, portstring, 1000).then((data) => {
        const onembed = new Discord.EmbedBuilder()
        .setTitle(`Statut`)
        .setColor(bot.config.Informations.color)
        .setDescription(`> 📡 | Statut: **Online (🟢)**
        > 📌 | IP: **${ipstring}**
        > 🔗 | Port: **${portstring}**
        > 👥 | Nombre de joueur en ligne: **${data.online}/${data.max}**
		> ⚙️ | Version du serveur: **${data.version}**
		> ⚒️ | Plugins: ${data.plugins}
		> 🪪 | MOTD: ${data.motd}`)
        .setTimestamp()

        message.reply({ embeds: [onembed] })
    }).catch(() => {
        const offembed = new Discord.EmbedBuilder()
        .setTitle(`Statut`)
        .setColor(bot.config.Informations.color)
        .setDescription(`> 📡 | Statut: **Offline (🔴)**
        > 📌 | IP: **${ipstring}**
        > 🔗 | Port: **${portstring}**
        > 👥 | Nombre de joueur en ligne: **??/??**`)
        .setTimestamp()
        message.reply({ embeds: [offembed] })
            });
  }
}
