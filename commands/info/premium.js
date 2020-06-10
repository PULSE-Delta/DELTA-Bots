const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'premium',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(message.author.id !== "512527737316048899") return;
      database.set(`premium_${message.guild.id}`, 1)
      message.channel.send("**This is now a premium guild!**")
    }
}