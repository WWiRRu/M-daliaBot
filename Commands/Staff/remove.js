const Discord = require("discord.js")

module.exports = {

    name: "remove",
    description: "Retire un membre au ticket",
    utilisation: "[membre]",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    category: "Ticket",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre",
            required: true
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Aucune personne trouvée !")

            if(!message.channel.topic.startsWith("Ticket de ")) return message.reply("Ce salon n'est pas un ticket !")
            if(!message.channel.permissionOverwrites.cache.get(user.id)) return message.reply("Cet utilisateur n'est pas dans le ticket !")

            await message.channel.permissionOverwrites.delete(user)

            await message.reply(`${message.user} a retiré ${user} au ticket !`)

        } catch (err) {

            return message.reply("Aucune personne trouvée !")
        }
    }
}