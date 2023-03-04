const Discord = require("discord.js");
const Canvas = require('canvas');
module.exports = async (bot, member) => {
    
    const canvas = Canvas.createCanvas(1025, 340);
    const joinedDate = member.joinedAt.toDateString();
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bot.config.Informations.color;
        ctx.font = '28px sans-serif';
        const background = await Canvas.loadImage('./Fond.png');
        ctx.drawImage(background, 0, 0, 1025, 340);
        ctx.font = '900 40px Arial';
        ctx.font = '30px sans-serif';
	    ctx.fillStyle = '#ffffff';
        if (member.joinedAt) {
            ctx.fillText(`Nouveau membre !\n± Nom d'utilisateur: ${member.user.tag}\n± Nombre de membres: ${member.guild.members.cache.filter(member => !member.user.bot).size}\n± Rejoint le: ${joinedDate}`, 350, 100);
        }else {
            ctx.fillText(`± Nom d'utilisateur: ${member.user.tag}\n± Nombre de membres: ${member.guild.members.cache.filter(member => !member.user.bot).size}`, 350, 100);
        }
        const body = await member.user.displayAvatarURL({ extension: 'jpg' });
	    const avatar = await Canvas.loadImage(await body);
	    ctx.beginPath();
	    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.clip();
	    ctx.drawImage(avatar, 25, 25, 200, 200);
        ctx.fillStyle = bot.config.Informations.color;
    member.roles.add(member.guild.roles.cache.get(bot.config.Arrivages.AutoRoleID));
    const attachment = new Discord.AttachmentBuilder(await canvas.toBuffer(), { name: 'welcome.png' });
    await bot.channels.cache.get(bot.config.Arrivages.UpcommingID).send({ files: [attachment]});
    
}