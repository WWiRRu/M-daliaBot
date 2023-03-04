const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Permet d'avoir l'avatar de quelqu'un",
    permission: "Aucune",
    dm: true,
    category: "Information",
    options: [
        {
        type: "user",
        name: "utlisateur",
        description: "Utlisateur a avoir l'avatar",
        required: false,
        }
    ],
    
    async run(bot, message, args) {
        let user = args.getUser(`utlisateur`) || message.user
        const AvatarEmbed = new Discord.EmbedBuilder()
        .setColor(bot.config.Informations.color)
        .setTitle(`Avatar`)
        .setDescription(`> Avatar de ${user.tag}`)
        .setTimestamp()
        .setImage(user.displayAvatarURL({size: 512}))
        .setFooter({ text: `Avatar de ${user.tag}`, iconURL: (user.displayAvatarURL({dynamic: true}))});
    message.reply({embeds: [AvatarEmbed]});
    }
}