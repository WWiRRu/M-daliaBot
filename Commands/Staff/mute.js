const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Permet de mute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: true,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Le temps du mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        const nomemberembed = new Discord.EmbedBuilder()
            .setTitle(`Aucuns membre`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Le membre ${member} n'existe pas ou n'es pas sur le serveur`)
            .setTimestamp()
        if(!member) return message.reply({embeds: [nomemberembed]})

        
        let time = args.getString("temps")
        const notimeembed = new Discord.EmbedBuilder()
            .setTitle(`Aucun temps défini`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Le temps ${time} est pas défini`)
            .setTimestamp()
        const toomanytimeembed = new Discord.EmbedBuilder()
            .setTitle(`Mute trop long`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Vous ne pouvez pas mute quelqu'un plus de 28 jours.`)
            .setTimestamp()
        const formatembed = new Discord.EmbedBuilder()
            .setTitle(`Mauvais format`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Le format indiqué n'est pas correcte`)
            .setTimestamp()
        if(!time) return message.reply({embeds: [notimeembed]})
        if(isNaN(ms(time))) return message.reply({embeds: [formatembed]})
        if(ms(time) > 2419200000) return message.reply({embeds: [toomanytimeembed]})

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune de raison fournie.";

        const muteyourselfembed = new Discord.EmbedBuilder()
            .setTitle(`Ne vous mutez pas`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Veuillez ne pas vous mute tout seul.`)
            .setTimestamp()
        if(message.user.id === user.id) return message.reply({embeds: [muteyourselfembed]})
        const ownerembed = new Discord.EmbedBuilder()
            .setTitle(`Vous ne pouvez pas mute cette personne`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Ne mute pas le propriétaire du  serveur !`)
            .setTimestamp()
        if((await message.guild.fetchOwner()).id === user.id) return message.reply({embeds: [ownerembed]})
        const notmoderatableembed = new Discord.EmbedBuilder()
            .setTitle(`Cette personne a trop d'importance pour moi`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Je ne peut pas mute ce membre !`)
            .setTimestamp()
        if(!member.moderatable) return message.reply({embeds: [notmoderatableembed]})
        const highestroleembed = new Discord.EmbedBuilder()
            .setTitle(`Vous ne pouvez pas mute cette personne`)
            .setColor(bot.config.Informations.color)
            .setDescription(`Vous n'avez pas le rôle requis pour mute cette personne`)
            .setTimestamp()
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [highestroleembed]})
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà mute !")

        try {await user.send(`Tu as été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison : \`${reason}\` !`)} catch(err) {}
        const succesmuteembed = new Discord.EmbedBuilder()
            .setTitle(`Nouveau mute`)
            .setColor(bot.config.Informations.color)
            .setDescription(`${message.user} a mute ${user.tag} pendant ${time} pour la raison : \`${reason}\``)
            .setTimestamp()
        await message.reply({embeds: [succesmuteembed]})

        await member.timeout(ms(time), reason)
    }
}