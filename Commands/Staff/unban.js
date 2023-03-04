const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "Permet de unban une personne",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a debannir",
            required: true,
            autocomplete: false

        }, 
        {
            type: "string",
            name: "raison",
            description: "La raison du debannissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = args.getUser("membre")
            if(!user) return message.reply("Pas de membre !")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie"

            if((await message.guild.fetch(user.id).size <= 0)) return message.reply("Ce membre n'est pas banni !")

            try {await user.send(`Tu as ete debanni par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

            await message.reply(`${message.user} a unban ${user.tag} pour la raison \`${reason}\``)

            await message.guild.membrers.unban(user, reason)
            
        } catch (err) {

            return message.reply("Pas de membre !")
        }
    }
}