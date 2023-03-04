const Discord = require("discord.js");
const axios = require('axios');

module.exports = {

    name: "emojiadd",
    description: "Permet d'ajouter un émoji sur le serveur.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "string",
            name: "emoji",
            description: "Quel est l'émoji?",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "nom",
            description: "Quel est le nom?",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args, db) {

        try {

            let emoji = message.options.getString("emoji")?.trim();
            let name = message.options.getString("nom");

            if (emoji.startsWith("<") && emoji.endsWith(">")) {
                const id = emoji.match(/\d{15,}/g)[0];

                const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`).then(image => {
                    if (image) return "gif"
                    else return "png"
                }).catch(err => {
                    return "png"
                });

                emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
            }

            await message.guild.emojis.create({ attachment: emoji, name: name }).then(emoji => {
                message.reply({ content: `Nouveaux émojie ajouter sur le serveur ${emoji.toString()} avec le nom ${emoji.name}` })
            })

        } catch (err) {

            console.log(`Une erreur dans la commande emojie.`, err)

        }
    }
}