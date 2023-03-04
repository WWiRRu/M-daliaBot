const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    category: "Modération",
    usage: "/ban [membre] <raison>",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre que tu veux ban",
            required: true,
            autocomplete: false,
        },
        {
            type: "string",
            name: "raison",
            description: "La raison du ban",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
        
        try{
           
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            let userEmbedContraire = new Discord.EmbedBuilder()
                .setDescription("**:x: Pas de membre à bannir !**")
                .setColor(bot.config.Informations.color)
            if(!user) return message.reply({content: [userEmbedContraire], ephemeral: true})
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison";

            let BanSelveEmbed = new Discord.EmbedBuilder()
                .setDescription(`**:x: N'essayez pas de vous mute !**`)
                .setColor(bot.config.Informations.color)
            if(message.user.id === user.id) return message.reply({embeds: [BanSelveEmbed], ephemeral: true})
            let OwnerEmbed = new Discord.EmbedBuilder()
                .setDescription(":x: **Vous essayez de bannir le créateur du serveur ? Ce n'est pas possible !**")
                .setColor(bot.config.Informations.color)
            if((await message.guild.fetchOwner()).id === user.id) return ({embeds: [OwnerEmbed], ephemeral: true})
            let CantBeBanned = new Discord.EmbedBuilder()
                .setDescription("**:x: Ce membre ne peut pas être banni !**")
                .setColor(bot.config.Informations.color)
            if(member && !member.bannable) return message.reply({embeds: [CantBeBanned], ephemeral: true})
            let RoleEmbedHighest = new Discord.EmbedBuilder()
                .setDescription("**:x: Vous ne pouvez pas bannir cet utilisateur!**")
                .setColor(bot.config.Informations.color)
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0 ) return message.reply({embeds: [RoleEmbedHighest], ephemeral: true})
            let AlreadyBanned = new Discord.EmbedBuilder()
                .setDescription(':x: **Cet utilisateur est déjà banni**')
                .setColor(bot.config.Informations.color)
            if((await message.guild.bans.fetch()).get(user.id)) return message.repy({embeds: [AlreadyBanned], ephemeral: true})

            try {

                let MpMessage = new Discord.EmbedBuilder()
                    .setDescription(`:x: **tu as été banni**\n\n> nom du serveur : **${message.guild.name}**\n> par : <@${message.user.id}>\n> Raison : \`${reason}\``)
                    .setColor(bot.config.Informations.color)
                    .setThumbnail(`${bot.user.displayAvatarURL({dynamic: true})}`)
                await user.send({embeds: [MpMessage], ephemeral: false})
            
            } catch(err) {}

            let GuildAnnounceBan = new Discord.EmbedBuilder()
                .setTitle(':white_check_mark: Ban')
                .setDescription(`> Le staff : <@${message.user.id}>\n> Membre banni : <@${user.id}>\n> Raison : \`${reason}\``)
                .setThumbnail(`${bot.user.displayAvatarURL({dynamic: true})}`)
                .setColor('Green')
            await message.reply({embeds: [GuildAnnounceBan], ephemeral: false})

            await message.guild.bans.create(user.id, {reason: reason})

        } catch(err) {
            
            let NobodyEmbed = new Discord.EmbedBuilder()
                .setDescription('**:x: Personne à bannir**')
                .setColor(bot.config.Informations.color)
            return message.reply({embeds: [NobodyEmbed], ephemeral: true})
        }
        
    }
}