const Discord = require('discord.js');

module.exports = {

    name: "botinfo",
    description: "Donne les Informations du Bot",
    permission: "Aucune",
    category: "Information",
    usage: "/botinfo",
    dm: true,

    async run(bot, message, args) {

        try{
        
            let row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("bot")
                .setLabel(`${bot.user.username}`)
                .setStyle(Discord.ButtonStyle.Secondary)
                .setDisabled(true)
            )

            let botInfoEmbed = new Discord.EmbedBuilder()
                .setTitle(`Informations de ${bot.user.tag}`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setColor(bot.config.Informations.color)
                .setTimestamp()
                .setDescription(`
                **__▶ Informations sur le Bot :__**
            
                > 📇 **Nom du Bot :** \`${bot.user.tag}\` | <@${bot.user.id}>
                > 🏷️ **Tag :** \`${bot.user.discriminator}\`
                > 🆔 **ID du bot :** \`${bot.user.id}\`
                > 👑 **Propriétaire :** \`${message.guild.members.cache.get(message.guild.ownerId) ? message.guild.members.cache.get(message.guild.ownerId).user.tag : message.guild.ownerId}\`
                > 💻 **Developpeur :** \`WWiRRu.js#7401\`
                > 📁 **Base de donnée :** \`Aucune\`
                > 🔧 **Version discord.js :** \`v${Discord.version}\`
                > 🔑 **Version node.js :** \`${process.version}\`
                > ⏱ **Connecté depuis :** ${Math.round(bot.uptime / (1000 * 60 * 60)) + "h " + (Math.round(bot.uptime / (1000 * 60)) % 60) + "m " + (Math.round(bot.uptime / 1000) % 60) + "s "}
                
                **__▶ Informations sur les statistiques__**
                
                > 🖥 **Serveurs :** \`${bot.guilds.cache.size}\`
                > 🙎‍♂️ **Users :** \`${bot.users.cache.size}\`
                > ✅ **Commandes :** \`${bot.commands.size}\`
                > 🧑‍💻 **Salons:** \`${bot.channels.cache.size}\`
                > 🎇 **Emojis :** \`${bot.emojis.cache.size}\``)  
                
                .setFooter({text: `${bot.user.username} informations`, iconURL: `${bot.user.displayAvatarURL()}`})

            await message.reply({embeds: [botInfoEmbed], components: [row], ephemeral: false})

        }catch(err){
            console.log(err)
        }
    }
}