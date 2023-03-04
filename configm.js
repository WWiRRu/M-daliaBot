module.exports = {
    Informations: {
        token: "MTA3OTc3NzQxNDg3NzU0ODYxNQ.G_xwqs.fsha6vaktNAsgqYyGNY4_UyWU7tcAEog1iTd_c", //Token du bot
        color: "#ff004e", //Couleur du bot (Code HEX)
        statutbot: "dnd", //Statut du bot (dnd, idle, online, invisible)
        servername: "- Médalia -", //Nom du serveur
    },
    Arrivages: {
        OutcommingID: "1079495395144650802", //ID du salon d'aurevoir
        UpcommingID: "1079495395144650802", //ID du salon d'arrivées
        AutoRoleID: "1079495374072447087", //ID du rôle automatique
    },
    Serveur: {
        Ip: "medalia-mc.eu", //Ip du serveur
        Port: "19132", //Port du serveur
        votelink: "https://minecraftpocket-servers.com/server/117552/", //Lien vers le site de vote
        creationchannel: "1079495396608463038", //ID du salon Crée ton salon
        creationcategory: "1079495384113623140", //ID de la catégorie crée ton salon
        suggestid: "1079495445438550016", //ID du salon des suggestions
        rulesid: "1079495395144650802", //ID du salon des règles
        idsetup: "1036128057418846299", //ID du message de setup
        setupchannelid: "1079495409380118588", //ID du salon de setup
        boutiquelink: "https://sunlightmc.tebex.io", //Lien vers la boutique
        staffrole: "1036127878036856842", //ID du rôle staff
        guildId: "1079227609726074910", //ID du serveur
    },
    Giveaways: {
        everyoneMention: "true", //True ou False
        hostedBy: "true", //True ou False
    },
    Tickets: {
        ticketpartenariatid: "1079495386370158622", //ID de la catégorie des tickets partenariat
        ticketbugid: "1079495386370158622", //ID de la catégorie des tickets bug
        ticketrecrutementsid: "1079495386370158622", //ID de la catégorie des tickets recrutements
        ticketreportid: "1079495386370158622", //ID de la catégorie des tickets report
        ticketquestionid: "1079495386370158622", //ID de la catégorie des tickets question
        transcriptid: "1079495386370158622", //ID du salon des transcripts des tickets
    },
    opt: {
        DJ: {
            enabled: false, 
            roleName: 'DJ',
            commands: [] 
        },
            
        voiceConfig: {
            leaveOnEnd: false, 
            autoSelfDeaf: false, 

            leaveOnTimer:{ 
                status: true,
                time: 30000, 
            }
        }, 

        maxVol: 100, 
        loopMessage: false,

        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25 
            }
            }
        }
}