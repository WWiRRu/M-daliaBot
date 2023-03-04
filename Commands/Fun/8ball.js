const Discord = require("discord.js")

module.exports = {

    name: "8ball",
    description: "Pose une question et il te dira la vérité.",
    permission: "Aucune",
    category: "Fun",
    dm: true,
    options: [
        {
            type: "string",
            name: "question",
            description: "La question que tu souhaites poser",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let questio = args.getString("question")
        let resulta = [`Oui`, `Non`, `Peut-être`][Math.floor(Math.random() * [`Oui`, `Non`, `Peut-être`].length)];

        const ballEmbed = new Discord.EmbedBuilder()
        .setTitle(`8ball`)
        .setColor(bot.config.Informations.color)
        .addFields(
            { name: 'Question', value: `${questio}`, inline: false },
            { name: 'Reponse', value: `${resulta}`, inline: false },
        )
        
        message.reply({ embeds: [ballEmbed] })
    }
}