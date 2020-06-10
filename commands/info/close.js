const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'close',
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
      let role = database.get(`staff_${message.guild.id}`)
  let backup = message.guild.roles.cache.find(role => role.name === "Ticket Staff");
  if(role === null || 0) return message.reply("This guild does not have it's support role set!")
  if(!message.member.roles.cache.has(role)) return message.reply("You do not have the staff role!")
      message.channel.delete();
      database.subtract(`opentickets_${message.guild.id}`, 1)
    }
}