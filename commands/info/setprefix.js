const {MessageEmbed} = require('discord.js');
const database = require('quick.db')
module.exports={
    name: 'setprefix',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Only admins can use this command!")
      database.set(`prefix_${message.guild.id}`, args[0])
      return message.reply(`I have set the prefix to **${args[0]}**`)
      
    }
}