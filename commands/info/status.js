const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'status',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      const status = database.get(`premium_${message.guild.id}`)
      
      if(status === null || 0) return message.channel.send("**This is __not__ a premium guild**")
      if(status === 1) return message.channel.send("**This is a premium guild**")
      
    }
}