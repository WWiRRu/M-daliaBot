const Discord = require("discord.js")

module.exports = {

    name: "rename",
    description: "Renomme le ticket",
    utilisation: "[nom]",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    category: "Ticket",
    options: [
        {
            type: "string",
            name: "nom",
            description: "Le nouveau nom",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let name = args.getString("nom")
        if(!name) return message.reply("Aucune nom trouvé !")

        if(!message.channel.topic.startsWith("Ticket de ")) return message.reply("Ce salon n'est pas un ticket !")

        await message.channel.setName(name)
        await message.reply(`${message.user} a renommé le ticket en ${name} !`)
    }
}