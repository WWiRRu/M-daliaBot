const Discord = require("discord.js")

module.exports = {

  name: "resetchannel",
  description: "Permet de recréer un channel",
  permission: Discord.PermissionFlagsBits.ManageChannels,
  dm: false,
  category: "Modération",

  async run(bot, message, args) {
    
    const channel = message.channel
    if(channel === message.channel) {
       try {
         let ee =  await channel.clone({
         name: channel.name,
         permissions: channel.permissionsOverwrites,
         type: channel.type,
         topic: channel.withTopic,
         nsfw: channel.nsfw,
         birate: channel.bitrate,
         userLimit: channel.userLimit,
         rateLimitPerUser: channel.rateLimitPerUser,
         permissions: channel.withPermissions,
         position: channel.rawPosition,
         reason:  `Salon recréé par ${message.user}`
         })
       channel.delete() 
       ee.send(`Salon recréé par ${message.user}`)
       } catch (error) {
         return;
       }
    }
  }
}