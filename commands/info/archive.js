const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'archive',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      const bugCategory = database.get(`bug_${message.guild.id}`)
      const payCategory = database.get(`payment_${message.guild.id}`)
      const generalCategory = database.get(`general_${message.guild.id}`)
      const reportCategory = database.get(`report_${message.guild.id}`)     
      if (message.channel.parentID !== bugCategory && message.channel.parentID !== payCategory && message.channel.parentID !== generalCategory && message.channel.parentID !== reportCategory) {
    return message.reply("**This command can only be used in tickets!**")
      }
      
      let sr = database.get(`staff_${message.guild.id}`)
  let backup = message.guild.roles.cache.find(role => role.name === "Ticket Staff");
  if(sr === null || 0) return message.reply("This guild does not have it's support role set!")
  if(!message.member.roles.cache.has(sr)) return message.reply("You do not have the staff role!")
      
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        message.channel.updateOverwrite(sr, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
        message.channel.updateOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
        message.channel.updateOverwrite(message.author, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
      
      message.channel.send("I have archived this ticket!")
      
    }
}