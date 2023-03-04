const Discord = require("discord.js")
const request = require('request');

module.exports = {
    name: "topvote",
    description: "Permet d'avoir le topvote de Tenor",
    permission: "Aucune",
    category: "Information",
    dm: true,
    
    async run(bot, message, args) {
        var url = bot.config.Serveur.key;
        request(url, function(err, response, body) {
            if (err) {
                console.log(err);
            }

            vote = JSON.parse(body);

            request(bot.config.Serveur.key, function(err, response, body) {
                if (err) {
                    console.log(err);
                }
                var top = JSON.parse(body);

                var topserver = top.rank;



                if (vote.voters[0] == null) {
                    var joueur1 = "Aucun";
                    var votes1 = "0";
                } else {
                    var joueur1 = vote.voters[0].nickname
                    var votes1 = vote.voters[0].votes
                }

                if (vote.voters[1] == null) {
                    var joueur2 = "Aucun";
                    var votes2 = "0";
                } else {
                    var joueur2 = vote.voters[1].nickname
                    var votes2 = vote.voters[1].votes
                }

                if (vote.voters[2] == null) {
                    var joueur3 = "Aucun";
                    var votes3 = "0";
                } else {
                    var joueur3 = vote.voters[2].nickname
                    var votes3 = vote.voters[2].votes
                }

                if (vote.voters[3] == null) {
                    var joueur4 = "Aucun";
                    var votes4 = "0";
                } else {
                    var joueur4 = vote.voters[3].nickname
                    var votes4 = vote.voters[3].votes
                }

                if (vote.voters[4] == null) {
                    var joueur5 = "Aucun";
                    var votes5 = "0";
                } else {
                    var joueur5 = vote.voters[4].nickname
                    var votes5 = vote.voters[4].votes
                }

                if (vote.voters[5] == null) {
                    var joueur6 = "Aucun";
                    var votes6 = "0";
                } else {
                    var joueur6 = vote.voters[5].nickname
                    var votes6 = vote.voters[5].votes
                }

                if (vote.voters[6] == null) {
                    var joueur7 = "Aucun";
                    var votes7 = "0";
                } else {
                    var joueur7 = vote.voters[6].nickname
                    var votes7 = vote.voters[6].votes
                }

                if (vote.voters[7] == null) {
                    var joueur8 = "Aucun";
                    var votes8 = "0";
                } else {
                    var joueur8 = vote.voters[7].nickname
                    var votes8 = vote.voters[7].votes
                }

                if (vote.voters[8] == null) {
                    var joueur9 = "Aucun";
                    var votes9 = "0";
                } else {
                    var joueur9 = vote.voters[8].nickname
                    var votes9 = vote.voters[8].votes
                }

                if (vote.voters[9] == null) {
                    var joueur10 = "Aucun";
                    var votes10 = "0";
                } else {
                    var joueur10 = vote.voters[9].nickname
                    var votes10 = vote.voters[9].votes
                }

                var ServerEmbed = {
                    color: 10066329,
                    title: 'Top 10 des Votes du mois',
                    url: bot.config.Serveur.votelink,
                    fields: [{
                            name: '1er: ' + joueur1,
                            value: 'Votes: ' + votes1,
                            inline: true,
                        },
                        {
                            name: '2ème: ' + joueur2,
                            value: 'Votes: ' + votes2,
                            inline: true,
                        },
                        {
                            name: '3ème: ' + joueur3,
                            value: 'Votes: ' + votes3,
                            inline: true,
                        },
                        {
                            name: '4ème: ' + joueur4,
                            value: 'Votes: ' + votes4,
                            inline: true,
                        },
                        {
                            name: '5ème: ' + joueur5,
                            value: 'Votes: ' + votes5,
                            inline: true,
                        },
                        {
                            name: '6ème: ' + joueur6,
                            value: 'Votes: ' + votes6,
                            inline: true,
                        },
                        {
                            name: '7ème: ' + joueur7,
                            value: 'Votes: ' + votes7,
                            inline: true,
                        },
                        {
                            name: '8ème: ' + joueur8,
                            value: 'Votes: ' + votes8,
                            inline: true,
                        },
                        {
                            name: '9ème: ' + joueur9,
                            value: 'Votes: ' + votes9,
                            inline: true,
                        },
                        {
                            name: '10ème: ' + joueur10,
                            value: 'Votes: ' + votes10,
                            inline: true,
                        },
                    ],
                    author: {
                        name: bot.config.Informations.servername,
                        icon_url: bot.user.displayAvatarURL({dynamic: true}),
                    },
                    footer: {
                        text: 'Le serveur est ' + topserver + 'e dans les top serveurs\nMinecraftpocket-Servers.com',
                    },
                };

                message.reply({embeds: [ServerEmbed]})

            });
        });
    }
}
