const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'setstaff',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Only admins can use this command!')
      let setmod = await database.fetch(`staff_${message.guild.id}`)
      const role = message.mentions.roles.first()
      if(!role) return message.reply("Please mention a role!")
      if(args[1]) return message.reply("Invalid formatting!") 
      database.set(`staff_${message.guild.id}`, role.id)
      message.channel.send(`I have set the support role to ${role}!`)
    }
}