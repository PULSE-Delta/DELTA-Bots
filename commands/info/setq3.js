const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'setq3',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      const question = message.content.split(" ").slice(1).join(" ")
      database.set(`question3_${message.guild.id}`, question)
      message.channel.send(`I have set your third question to **${question}**`)
    }
}