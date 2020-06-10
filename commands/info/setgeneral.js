const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'setgeneral',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      let channel = message.guild.channels.cache.get(args[0]);
      if(channel.type !== 'category') return message.reply("That is not a category!")
      
      database.set(`general_${message.guild.id}`, args[0])
      message.channel.send(`I have set the general category!`)
    }
}