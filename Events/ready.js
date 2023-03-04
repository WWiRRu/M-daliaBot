const loadSlashCommand = require('../Loaders/loadSlashCommands');
const Discord = require('discord.js')
const libquery = require('libquery')

module.exports = async (bot) => {

    loadSlashCommand(bot);
    console.log(`Je suis connecté et prêt à servir ${bot.guilds.cache.size} serveurs et ${bot.users.cache.size} utilisateurs`)
    console.log(`🚀 Je suis prêt! Connécté en tant que \x1b[37;46;1m${bot.user.tag}\x1b[0m (\x1b[37;46;1m${bot.user.id}\x1b[0m)\n🌟 Vous pouvez aller mettre une étoile sur GitHub: \x1b[37;46;1mhttps://github.com/WWiRRu\x1b[0m\n`);
    bot.user.setStatus('dnd');
    let channelss = bot.channels.cache.get(bot.config.Serveur.ChannelSetupID)
    setInterval(() => {
    channelss.messages.fetch(bot.config.Serveur.IDSetup).then( msg => {
        libquery.query(bot.config.Serveur.Ip, bot.config.Serveur.Port).then((data) => {
            channelss.setName('〡🟢・statut')
            let statuses = [
                "Medalia",
                `${data.online} / ${data.max}`
            ];
               let status = statuses[Math.floor(Math.random() * statuses.length)];
               bot.user.setActivity(status, {
                   type: Discord.ActivityType.Playing,
               });
            const onembed = new Discord.EmbedBuilder()
            .setTitle('Statut')
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setColor("#62FF00")
            .setDescription(`> 📡 | Statut: **Online (🟢)**
            > 📌 | IP: **${bot.config.Serveur.Ip}**
            > 🔗 | Port: **19132**
            > 👥 | Nombre de joueur en ligne: **${data.online}/${data.max}**
            > ⚙️ | Version du serveur: **${data.version}**
            > ✏ | MOTD: **${data.motd}**`)
            .setTimestamp()
            msg.edit({ embeds: [onembed] })
        }).catch(() => {
            channelss.setName('〡🔴・statut')
            let statuses = [
                "Medalia",
                `?? / ??`
            ];
               let status = statuses[Math.floor(Math.random() * statuses.length)];
               bot.user.setActivity(status, {
                   type: Discord.ActivityType.Playing,
               });
            const offembed = new Discord.EmbedBuilder()
            .setTitle('Statut')
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setColor("#FF0000")
            .setDescription(`> 📡 | Statut: **Offline (🔴)**
            > 📌 | IP: **${bot.config.Serveur.Ip}**
            > 🔗 | Port: **19132**
            > 👥 | Nombre de joueur en ligne: **??/??**
            > ⚙️ | Version du serveur: **v??.??.??**
            > ✏ | MOTD: ??`)
            .setTimestamp()
            msg.edit({ embeds: [offembed] })
        });
        });
    }, 10000)
}
