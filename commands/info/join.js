 const {MessageEmbed} = require('discord.js');
 const database = require('quick.db');
 module.exports={
     name: 'join',
     category: 'info',
     description: 'text here',
     run: async(bot,message,args)=>{
       const embed = new MessageEmbed()
       .setTitle("Ticket Master Premium")
       .setDescription("To get started, [Click Here](https://invite.gg/RetroStudioNetwerk)")
       .addField("Buying Premium", "After joining the server above, please visit <#> and use `!new payment`. Please mention that you want to buy premium")
       .addField("Prices", "Visit <#719527608299290726> to view our prices")
       .addField("Payment", "The developer will repond to you shortly, we accept PayPal and Nitro Classic!")
       .setColor("GREEN")
       .setFooter("Made by Pulse")
      .setTimestamp()
      
      message.channel.send(embed)
    }
 }