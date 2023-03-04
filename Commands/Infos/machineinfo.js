const fs = require("fs");
const Discord = require("discord.js");
const osu = require('node-os-utils');
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os
const ms = require("ms");
 
 
module.exports = {
 
    name: "machineinfo",
    description: "Donne des information sur la machine.",
    permission: "Aucune",
    dm: true,
    category: "Informations",
 
    async run(bot, message) {
 
        try {
 
            await message.deferReply()
 
            const cpuUsage = `>  Model : \`${await cpu.model()}\`\n> Utilisé: \`${await cpu.usage() + " %"}\`\n> Restant : \`${await cpu.free() + " %"}\`\n> Logique : \`${await cpu.count()}\`\n> Avg :\`${await cpu.loadavg()}\`\n> Avg :\`${await cpu.loadavgTime()}\``;
            const memoryUsage = `> Total : \`${(await mem.info()).totalMemMb + "MB"}\`\n> Utilisé : \`${(await mem.info()).usedMemMb + "MB"}\`\n> Restante : \`${await (await mem.info()).freeMemMb + "MB"}\``
            const operatingSystem = `> Name : \`${os.hostname()}\`\n> Plateforme : \`${os.platform()}\`\n> Type : \`${os.type()}\`\n> Version : \`${os.arch()}\`\n> upTime : \`${ms(os.uptime())}\`\n `
 
            const Embed = new Discord.EmbedBuilder()
                .setColor(bot.config.Informations.color)
                .setTitle(`Chargement des information sur la machine du bot.`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`** __Je cherche les informations de la machine__ **
 
                > ** Sur le serveur:** ${message.guild.name},
 
\`veuillez patienter\`.`)
                .setTimestamp()
                .setFooter({ text: "Stats" })
 
            await message.followUp({ embeds: [Embed] }).then(() => {
 
                const embed = new Discord.EmbedBuilder()
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`**__Information de la machine__**
 
                    **__Cpu :__**\n ${cpuUsage}
                    **__Ram :__**\n ${memoryUsage}
                    **__System :__**\n ${operatingSystem}
 
                    `)
                    .setColor(bot.config.Informations.color)
                    .setTimestamp()
                    .setFooter({ text: "Info machine" })
 
                setTimeout(async () => await message.editReply({ embeds: [embed]}), 2000)
                setInterval
            })
        } catch (err) {
 
            console.log(`Une erreur dans la commande info_machine.`, err)
 
            fs.writeFile("./erreur.txt", `${err.stack} `, () => {
                return
            })
 
            message.channel.send({ content: `⚠️ Une erreur est apparue! Sur le  ${message.guild.name}!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
 
    }
}