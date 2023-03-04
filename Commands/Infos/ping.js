const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Permet de connaitre la latence du bot.",
    permission: "Aucune",
    category: "Autres",


    async run (bot, message) {
    const start = Date.now();
    let last = Date.now();
    const PingEmbed = new Discord.EmbedBuilder()
        .setTitle('Ping')
        .setColor(bot.config.Informations.color)
        .setDescription(`Ping message: **${Date.now() - start}ms**🛰️\nLatence message: **${last - start}ms**🛰️\nLatence API: **${Math.round(bot.ws.ping)}ms**🛰️`)
        .setTimestamp()

        await message.channel.send({embeds: [PingEmbed]})
    }
}