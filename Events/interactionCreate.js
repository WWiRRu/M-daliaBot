const Discord = require ("discord.js")
const { ChannelSelectMenuBuilder } = require('discord.js');
const transcript = require("discord-html-transcripts")

module.exports = async (bot, interaction) => {
    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete){
        let entry = interaction.options.getFocused() 
        if(interaction.commandName === "help" ){
            let choice = bot.commands.filter(cmd => cmd.name.includes(entry))
        await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choice.map(choice => ({name: choice.name, value: choice.name})))
        }   
    }
    if(interaction.type === Discord.InteractionType.ApplicationCommand){
        const command = interaction.client.commands.get(interaction.commandName);
        command.run(bot, interaction, interaction.options)
    }
    if(interaction.isButton()) {
 
      if(interaction.customId === "ticket") {

          const Modal = new Discord.ModalBuilder()
          .setCustomId("modal")
          .setTitle("Questionnaire")

          let question1 = new Discord.ActionRowBuilder().addComponents(new Discord.TextInputBuilder()
          .setCustomId("pseudo")
          .setRequired(true)
          .setStyle(Discord.TextInputStyle.Short)
          .setLabel("Quel est votre pseudo ?")
          .setPlaceholder("Ecrire votre pseudo ici"))
          let question2 = new Discord.ActionRowBuilder().addComponents(new Discord.TextInputBuilder()
          .setCustomId("raison")
          .setRequired(true)
          .setStyle(Discord.TextInputStyle.Short)
          .setLabel("Quelle est la raison de ce ticket ?")
          .setPlaceholder("Ecrire votre raison ici"))
          let question3 = new Discord.ActionRowBuilder().addComponents(new Discord.TextInputBuilder()
          .setCustomId("preuve")
          .setRequired(false)
          .setStyle(Discord.TextInputStyle.Paragraph)
          .setLabel("Avez-vous des preuves ?")
          .setPlaceholder("Ecrire vos preuves ici"))

          await Modal.addComponents(question1, question2, question3)
          await interaction.showModal(Modal)

          let response = await interaction.awaitModalSubmit({time: 6000000})
          let pseudo = response.fields.getTextInputValue("pseudo")
          let raison = response.fields.getTextInputValue("raison")
          let preuve = response.fields.getTextInputValue("preuve")

          let number = interaction.channel.parent.children.cache.filter(c => c.topic?.startsWith("Ticket de ")).size;
          let channel = await interaction.guild.channels.create({name: `ticket-${number+1}`, type: Discord.ChannelType.GuildText})

          await channel.setParent(interaction.channel.parent.id)
          await channel.setTopic(`Ticket de ${interaction.user.id}`)
          await channel.permissionOverwrites.create(interaction.user, {
              ViewChannel: true,
              SendMessages: true,
              ReadMessageHistory: true,
              AttachFiles: true,
              EmbedLinks: true
          })
          await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
              ViewChannel: false
          })

          const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Danger)
          .setLabel("Fermer le ticket")
          .setCustomId("close"))

          let Embed = new Discord.EmbedBuilder()
          .setColor(bot.config.Informations.color)
          .setTitle(`Ticket de ${interaction.user.tag}`)
          .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
          .setDescription(`Pseudo : ${pseudo}\nRaison : ${raison}\nPreuve : ${preuve ? preuve : "Aucune"}`)

          await channel.send({embeds: [Embed], components: [btn]})
          await response.reply({content: `Votre ticket a été créé : ${channel} !`, ephemeral: true})
      }

      if(interaction.customId === "close") {

          let user = await bot.users.fetch(interaction.channel.topic.split(" ")[2])
          await interaction.channel.permissionOverwrites.delete(user)

          const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
          .setCustomId("open")
          .setStyle(Discord.ButtonStyle.Success)
          .setLabel("Réouvrir"),
          new Discord.ButtonBuilder()
          .setCustomId("transcript")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setLabel("Transcript"),
          new Discord.ButtonBuilder()
          .setCustomId("delete")
          .setStyle(Discord.ButtonStyle.Danger)
          .setLabel("Fermer"))

          await interaction.reply({components: [btn]})
      }

      if(interaction.customId === "open") {

          let user = await bot.users.fetch(interaction.channel.topic.split(" ")[2])

          await interaction.deferUpdate()
          await interaction.channel.permissionOverwrites.create(user, {
              ViewChannel: true,
              SendMessages: true,
              ReadMessageHistory: true,
              AttachFiles: true,
              EmbedLinks: true
          })

          await interaction.editReply(`${interaction.user} a réouvert le ticket !`)
      }

      if(interaction.customId === "transcript") {

          await interaction.deferUpdate()
          const Menu = new Discord.ActionRowBuilder().addComponents(new Discord.SelectMenuBuilder()
          .setChannelTypes(Discord.ChannelType.GuildText)
          .setMaxValues(1)
          .setMinValues(1)
          .setCustomId("menu")
          .setPlaceholder("Sélectionner le salon où envoyer le transcript..."))

          await interaction.editReply({components: [Menu]})
          let filterm = m => m.user.id === interaction.user.id && m.customId === "menu";
          let menu = await (await interaction.fetchReply()).awaitMessageComponent({filter: filterm})

          let channel = interaction.guild.channels.cache.get(menu.values[0])
          let user = await bot.users.fetch(interaction.channel.topic.split(" ")[2])

          await menu.deferUpdate()
          const attachment = await Transcript.createTranscript(interaction.channel);
          await channel.send({content: `Ticket ${user.tag}`, files: [attachment]})
          await interaction.editReply({content: `${interaction.user} a envoyé le transcript du ticket dans le salon ${channel} !`, components: []})
      }

      if(interaction.customId === "delete") {

          try {await user.send(`${interaction.user} a fermé votre ticket !`)} catch (e) {}
          await interaction.channel.delete()
      }
    }
}  