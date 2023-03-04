const Discord = require("discord.js")

module.exports = {

    name: "ticket",
    description: "Envoie l'embed des tickets",
    utilisation: "",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Ticket",
    options: [],

    async run(bot, message, args, db) {

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.config.Informations.color)
        .setTitle("Création d'un ticket")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Bienvenue dans le panel de création de ticket, pour créer un ticket, appuyez sur le bouton ci-dessous. Nous vous rappelons que votre conversion sera enregistrée et stockée.")

        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Primary)
        .setLabel("Créer un ticket")
        .setCustomId("ticket"))

        await message.reply({embeds: [Embed], components: [btn]})
    }
}