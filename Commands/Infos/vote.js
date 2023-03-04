const Discord = require("discord.js")

module.exports = {
    name: "vote",
    description: "Permet d'aller voter pour Tenor",
    permission: "Aucune",
    category: "Information",
    dm: true,
    
    async run(bot, message, args) {
        
        const VoteButton = new Discord.ActionRowBuilder()
        .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel('Vote')
                    .setStyle(Discord.ButtonStyle.Link)
                    .setURL(bot.config.Serveur.votelink)
        );
        const VoteEmbed = new Discord.EmbedBuilder()
        .setColor(bot.config.Informations.color)
        .setTitle('Vote')
        .setDescription("Voici le site de vote")
        .setURL(bot.config.Serveur.votelink)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        
        await message.reply({embeds: [VoteEmbed], components: [VoteButton]})
    }
}