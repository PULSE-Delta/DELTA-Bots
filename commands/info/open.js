const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'open',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      let openTickets = database.get(`opentickets_${message.guild.id}`)
      if(openTickets === null || 0){
        openTickets = 0
      }
      message.channel.send(`There are currently **${openTickets} tickets open!**`)
    }
}