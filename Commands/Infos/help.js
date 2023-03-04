const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Permet d'avoir toutes les information sur les commandes du bot",
    permission: "Aucune",
    dm: true,
    category: "Autres",
    options: [
        {
            type: "string",
            name: "commande",
            description: "La commande à afficher",
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {

        let command;
        if(args.getString("commande")){
            command = bot.commands.get(args.getString("commande"));
            if(!command)return message.reply("Pas de commande !")
        }
            if(!command) {
                let categories = [];
                bot.commands.forEach(command => {
                    if(!categories.includes(command.category)) categories.push(command.category)
                })
            

            let HelpEmbed = new Discord.EmbedBuilder()
            .setTitle(`Commandes du bot`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Prefix: \`/\`\nCommandes disponible: \`${bot.commands.size}\`\nCatégories disponibles: \`${categories.length}\``)
            .setTimestamp()
            .setColor(bot.config.Informations.color)

            await categories.sort().forEach(async cat => {
                
                let commands = bot.commands.filter(cmd => cmd.category === cat)
                HelpEmbed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [HelpEmbed]})
        } else {
            let HelpEmbed = new Discord.EmbedBuilder()
            .setTitle(`Commande ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Prefix: \`/\`\nNom: \`${command.name}\`\nDescription: \`${command.description}\`\nPermission Requise: \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommande en MP: \`${command.dm ? "Oui" : "Non"}\`\nCatégorie: \`${command.category}\``)
            .setTimestamp()
            .setColor(bot.config.Informations.color) 
            await message.reply({embeds: [HelpEmbed]})
        }
    }
}