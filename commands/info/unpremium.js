const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'unpremium',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(message.author.id !== "512527737316048899") return;
      database.set(`premium_${message.guild.id}`, null)
      message.channel.send("**This is no longer a premium guild!**")
    }
}