const Discord = require("discord.js")

module.exports = {

    name: "add",
    description: "Ajoute un membre au ticket",
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

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Aucune personne trouvée !")

            if(!message.channel.topic.startsWith("Ticket de ")) return message.reply("Ce salon n'est pas un ticket !")
            if(message.channel.permissionOverwrites.cache.get(user.id)) return message.reply("Cet utilisateur est déjà dans le ticket !")

            await message.channel.permissionOverwrites.create(user, {
                ViewChannel: true,
                SendMessages: true,
                ReadMessageHistory: true,
                AttachFiles: true,
                EmbedLinks: true
            })

            await message.reply(`${message.user} a ajouté ${user} au ticket !`)

        } 
    }