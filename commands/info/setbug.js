const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'setbug',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      let channel = message.guild.channels.cache.get(args[0]);
      if(channel.type !== 'category') return message.reply("That is not a category!")
      
      database.set(`bug_${message.guild.id}`, channel.id)
      message.channel.send(`I have set the bug category!`)
    }
}