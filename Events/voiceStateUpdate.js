const Discord = require("discord.js");

module.exports = async (bot, oldState, newState) => {
    let oldChannel = oldState.channel;
    let newChannel = newState.channel;
    let user = newState.guild.members.cache.get(newState.id).user || oldState.guild.members.cache.get(oldState.id).user;

    if (newChannel?.id === bot.config.Serveur.creationchannel) {
        let channel = await newChannel.guild.channels.create({ name: `Salon de ${user.username}`, type: 2 });
        await channel.setParent(newChannel.parentId);
        newState.guild.members.cache.get(newState.id).voice.setChannel(channel);
    }
    if (oldChannel?.parentId === bot.config.Serveur.creationcategory && oldChannel?.id !== bot.config.Serveur.creationchannel) {
        if (oldChannel.members.size <= 0) await oldChannel.delete();
    }
}