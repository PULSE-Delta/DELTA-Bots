const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'tickets',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      const tickets = database.get(`tickets_${message.guild.id}`)
      message.channel.send(`This guild has had **${tickets} tickets**`)
    }
}