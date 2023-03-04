const Discord = require('discord.js');
const ms = require('ms');

module.exports = {

    name: 'unmute',
    description: 'Permet de unmute un membre',
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
  category: `Modération`,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a unmute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du unmute",
            required: false,
            autocomplete: false
        }
    ],


    async run(bot, message, args) {

        let user = args.getUser("membre");
        if(!user) return message.reply("Aucun membre trouver !")

        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun membre trouver !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(!member.moderatable) return message.reply("Je ne peut pas unmute ce membre car je n'ai pas les permissions requise !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas unmute ce membre")
        if(!member.isCommunicationDisabled()) return message.reply("Ce membre n'est pas mute")

        try {await user.send(`Vous avez ete Unmute par ${message.user.tag} pour la raison \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} a unmute ${user.tag} pour la raison \`${reason}\``)

        await member.timeout(null, reason)


    },
};