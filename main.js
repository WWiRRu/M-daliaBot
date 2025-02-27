const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")

bot.config = require('./config')
bot.commands = new Discord.Collection()
bot.login(bot.config.Informations.token)
bot.commands = loadCommands('./Commands/');
loadEvents(bot)
