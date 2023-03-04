const Discord = require("discord.js")

module.exports = {
    name: "boutique",
    description: "Permet d'accéder a la boutique de Sulfuritium",
    permission: "Aucune",
    category: "Information",
    dm: true,
    
    async run(bot, message, args) {
        
        const BoutiqueButton = new Discord.ActionRowBuilder()
        .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel('Boutique')
                    .setStyle(Discord.ButtonStyle.Link)
                    .setURL(bot.config.Serveur.boutiquelink)
        );
        const BoutiqueEmbed = new Discord.EmbedBuilder()
        .setColor(bot.config.Informations.color)
        .setTitle('Boutique')
        .setDescription("Pour accéder a la boutique veuillez appuyer sur le bouton")
        .setURL(bot.config.Serveur.boutiquelink)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        
        await message.reply({embeds: [BoutiqueEmbed], components: [BoutiqueButton]})
    }
}