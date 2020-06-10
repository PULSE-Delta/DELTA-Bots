//Requirements
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", (request, response) => {
  console.log("🏓 " + Date.now() + " Website Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const database = require('quick.db');
const botconfig = require("./botconfig.json");
const { MessageEmbed, Collection, Client } = require("discord.js");
const { VultrexDB } = require("vultrex.db");
const bot = new Client();
const config = require("./botconfig.json");
const fs = require("fs");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

//Bot is online message/status
bot.on("ready", async () => {
  console.log(
    `${bot.user.username} is online on ${bot.guilds.cache.size} servers!`
  );
  bot.user.setActivity(`${bot.guilds.cache.size} servers | !help`, { type: "WATCHING" });
});

bot.on(`message`, async message => {
  const database2 = require('quick.db');
  let prefix = database2.get(`prefix_${message.guild.id}`)
  if (prefix === null || 0) prefix = "!"  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return message.reply(`<@${message.author.id}>, I cannot repond to commands in DMs`);
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  if (command) command.run(bot, message, args);
  
  if(message.content.toLowerCase() === "!new bug") {
  //let supportCategory = message.guild.channels.cache.find(category => category.name === "Bug Tickets")
    let supportCategory = database.get(`bug_${message.guild.id}`)
    if(supportCategory === null || 0) return message.reply('')
      
      if (!message.guild.me.permissions.has("MANAGE_CHANNELS") && !supportCategory) {
        message.channel.send(`Sorry but I do not have permission to create a category!`)
      }
      
      const ticketAmt = database.get(`tickets_${message.guild.id}`)
      
      let channelName = `ticket-${message.author.username}`.toLowerCase()
      channelName = channelName.replace(/ /g, '-')
      channelName = channelName.replace(/\W/g, '')
      
      if(message.guild.channels.cache.some(channel =>
          channel.name.toLowerCase() === channelName)) { 
        message.reply("**You already have a ticket open!**")
      } else {
        
      const sr = database.get(`staff_${message.guild.id}`)
      if(sr === null | 0) return message.reply("There is no Ticket Staff role set for this server!")
      
      message.guild.channels.create(channelName, { parent: supportCategory, topic: `Ticket Owner: <@${message.author.id}>` }).then(c => {
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        c.updateOverwrite(sr, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          MENTION_EVERYONE: false,
        });
        c.updateOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ticket Created")
        .setDescription(`<@${message.author.id}> Your support ticket channel is <#${c.id}>`)
        .setTimestamp()
        .setFooter("Made by Cloud")
        message.channel.send(embed)
        
        let question1 = database.get(`question1_${message.guild.id}`)
        if(question1 === null || 0) {
          question1 = "Nothing was provided here"
        }
        let question2 = database.get(`question2_${message.guild.id}`)
        if(question2 === null || 0) {
          question2 = "Nothing was provided here"
        }
        let question3 = database.get(`question3_${message.guild.id}`)
        if(question3 === null || 0) {
          question3 = "Nothing was provided here"
        }
        
        let wEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Ticket Support")
        .setDescription("**__Thanks for opening a ticket! Support will be with you shortly.__**\n\nPlease explain the situation below")
        .addField("Ticket Owner:", `<@${message.author.id}>`)
        .addField("Question 1:", `__**${question1}**__`)
        .addField("Question 2:", `__**${question2}**__`)
        .addField("Question 3:", `__**${question3}**__`)
        .setTimestamp()
        .setFooter("Made by Pulse")
        c.send(`${message.author}, here is your ticket!`)
        c.send(wEmbed)
        
        database.add(`tickets_${message.guild.id}`, 1)
        database.add(`opentickets_${message.guild.id}`, 1)
        
      }).catch(console.error);
      }
  }
  
  //Report ticket
  if(message.content.toLowerCase() === "!new report") {
  let supportCategory = database.get(`report_${message.guild.id}`)
  if(supportCategory === null || 0) return message.channel.send("**This guild does not have its general ticket category set!**")
      
      if (!message.guild.me.permissions.has("MANAGE_CHANNELS") && !supportCategory) {
        message.channel.send(`Sorry but I do not have permission to create a category!`)
      }
      
      const sr = message.guild.roles.cache.find(role => role.name === "Ticket Staff")
      
      if (sr === null | 0 )
        return message.channel.send(`There is no support team role! Please create a role named "Ticket Staff"`)
      
      
      const ticketAmt = database.get(`tickets_${message.guild.id}`)
      
      let channelName = `ticket-${message.author.username}`.toLowerCase()
      channelName = channelName.replace(/ /g, '-')
    channelName = channelName.replace(/\W/g, '')
      
      if(message.guild.channels.cache.some(channel =>
          channel.name.toLowerCase() === channelName)) { 
        message.reply("**You already have a ticket open!**")
      } else {
      
      console.log(channelName)
        
        const sr = database.get(`staff_${message.guild.id}`)
      if(sr === null | 0) return message.reply("There is no Ticket Staff role set for this server!")
      
      message.guild.channels.create(channelName, { parent: supportCategory, topic: `Ticket Owner: <@${message.author.id}>` }).then(c => {
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        c.updateOverwrite(sr, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          MENTION_EVERYONE: false,
        });
        c.updateOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ticket Created")
        .setDescription(`<@${message.author.id}> Your support ticket channel is <#${c.id}>`)
        .setTimestamp()
        .setFooter("Made by Pulse")
        message.channel.send(embed)
        
        let question1 = database.get(`question1_${message.guild.id}`)
        if(question1 === null || 0) {
          question1 = "Nothing was provided here"
        }
        let question2 = database.get(`question2_${message.guild.id}`)
        if(question2 === null || 0) {
          question2 = "Nothing was provided here"
        }
        let question3 = database.get(`question3_${message.guild.id}`)
        if(question3 === null || 0) {
          question3 = "Nothing was provided here"
        }
        
        let wEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Ticket Support")
        .setDescription("**__Thanks for opening a ticket! Support will be with you shortly.__**\n\nPlease explain the situation below")
        .addField("Ticket Owner:", `<@${message.author.id}>`)
        .addField("Question 1:", `__**${question1}**__`)
        .addField("Question 2:", `__**${question2}**__`)
        .addField("Question 3:", `__**${question3}**__`)
        .setTimestamp()
        .setFooter("Made by Pulse")
        c.send(`${message.author}, here is your ticket!`)
        c.send(wEmbed)
        
        database.add(`tickets_${message.guild.id}`, 1)
        database.add(`opentickets_${message.guild.id}`, 1)
        
      }).catch(console.error);
      }
  }
  
  //Report tickets
  if(message.content.toLowerCase() === "!new payment") {
  let supportCategory = database.get(`payment_${message.guild.id}`)
  if(supportCategory === null || 0) return message.channel.send("**This guild does not have its general ticket category set!**")
      
      if (!message.guild.me.permissions.has("MANAGE_CHANNELS") && !supportCategory) {
        message.channel.send(`Sorry but I do not have permission to create a category!`)
      }

      const ticketAmt = database.get(`tickets_${message.guild.id}`)
      
      let channelName = `ticket-${message.author.username}`.toLowerCase()
      channelName = channelName.replace(/ /g, '-')
    channelName = channelName.replace(/\W/g, '')
      
      if(message.guild.channels.cache.some(channel =>
          channel.name.toLowerCase() === channelName)) { 
        message.reply("**You already have a ticket open!**")
      } else {
      
      console.log(channelName)
        
        const sr = database.get(`staff_${message.guild.id}`)
      if(sr === null | 0) return message.reply("There is no Ticket Staff role set for this server!")
      
      message.guild.channels.create(channelName, { parent: supportCategory, topic: `Ticket Owner: <@${message.author.id}>` }).then(c => {
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        c.updateOverwrite(sr, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          MENTION_EVERYONE: false,
        });
        c.updateOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ticket Created")
        .setDescription(`<@${message.author.id}> Your support ticket channel is <#${c.id}>`)
        .setTimestamp()
        .setFooter("Made by Pulse")
        message.channel.send(embed)
        
        let question1 = database.get(`question1_${message.guild.id}`)
        if(question1 === null || 0) {
          question1 = "Nothing was provided here"
        }
        let question2 = database.get(`question2_${message.guild.id}`)
        if(question2 === null || 0) {
          question2 = "Nothing was provided here"
        }
        let question3 = database.get(`question3_${message.guild.id}`)
        if(question3 === null || 0) {
          question3 = "Nothing was provided here"
        }
        
        let wEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Ticket Support")
        .setDescription("**__Thanks for opening a ticket! Support will be with you shortly.__**\n\nPlease explain the situation below")
        .addField("Ticket Owner:", `<@${message.author.id}>`)
        .addField("Question 1:", `__**${question1}**__`)
        .addField("Question 2:", `__**${question2}**__`)
        .addField("Question 3:", `__**${question3}**__`)
        .setTimestamp()
        .setFooter("Made by Pulse")
        c.send(`${message.author}, here is your ticket!`)
        c.send(wEmbed)
        
        database.add(`tickets_${message.guild.id}`, 1)
        database.add(`opentickets_${message.guild.id}`, 1)
        
      }).catch(console.error);
      }
  }
  
  //general
  if(message.content.toLowerCase() === "!new general") {
  let supportCategory = database.get(`general_${message.guild.id}`)
  if(supportCategory === null || 0) return message.channel.send("**This guild does not have its general ticket category set!**")
      
      if (!message.guild.me.permissions.has("MANAGE_CHANNELS") && !supportCategory) {
        message.channel.send(`Sorry but I do not have permission to create a category!`)
      }
      
      const ticketAmt = database.get(`tickets_${message.guild.id}`)
      
      let channelName = `ticket-${message.author.username}`.toLowerCase()
      channelName = channelName.replace(/ /g, '-')
    channelName = channelName.replace(/\W/g, '')
      
      if(message.guild.channels.cache.some(channel =>
          channel.name.toLowerCase() === channelName)) { 
        message.reply("**You already have a ticket open!**")
      } else {
      
      console.log(channelName)
        
        const sr = database.get(`staff_${message.guild.id}`)
      if(sr === null | 0) return message.reply("There is no Ticket Staff role set for this server!")
      
      message.guild.channels.create(channelName, { parent: supportCategory, topic: `Ticket Owner: <@${message.author.id}>` }).then(c => {
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        c.updateOverwrite(sr, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          MENTION_EVERYONE: false,
        });
        c.updateOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ticket Created")
        .setDescription(`<@${message.author.id}> Your support ticket channel is <#${c.id}>`)
        .setTimestamp()
        .setFooter("Made by Pulse")
        message.channel.send(embed)
        
        let question1 = database.get(`question1_${message.guild.id}`)
        if(question1 === null || 0) {
          question1 = "Nothing was provided here"
        }
        let question2 = database.get(`question2_${message.guild.id}`)
        if(question2 === null || 0) {
          question2 = "Nothing was provided here"
        }
        let question3 = database.get(`question3_${message.guild.id}`)
        if(question3 === null || 0) {
          question3 = "Nothing was provided here"
        }
        
        let wEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Ticket Support")
        .setDescription("**__Thanks for opening a ticket! Support will be with you shortly.__**\n\nPlease explain the situation below")
        .addField("Ticket Owner:", `<@${message.author.id}>`)
        .addField("Question 1:", `__**${question1}**__`)
        .addField("Question 2:", `__**${question2}**__`)
        .addField("Question 3:", `__**${question3}**__`)
        .setTimestamp()
        .setFooter("Made by Pulse")
        c.send(`${message.author}, here is your ticket!`)
        c.send(wEmbed)
        
        database.add(`tickets_${message.guild.id}`, 1)
        database.add(`opentickets_${message.guild.id}`, 1)
        
      }).catch(console.error);
        
        
        
        
      }
  }



});
  const token = process.env.DISCORD_TOKEN;
  bot.login(token);