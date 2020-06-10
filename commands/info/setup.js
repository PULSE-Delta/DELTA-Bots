const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'setup',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      const embed = new MessageEmbed()
      .setTitle("DELTA Support Setup")
      .setColor("ORANGE")
      .setFooter("Made By Pulse")
      .setTimestamp()
      .addField("setprefix", "Set the prefix for the server `Usage: !setprefix (prefix)`")
      .addField("setstaff", "Set the Ticket Staff role `Usage: !setstaff (role mention)`")
      .addField("setbug", "Set the bug ticket category `Usage: !setbug (category ID)`")
      .addField("setgeneral", "Set the general ticket category")
      .addField("setpayment", "Set the payment ticket category")
      .addField("setreport", "Set the report ticket category")
      .addField("setq1", "Set the first question on your ticket")
      .addField("setq2", "Set the second question on your ticket")
      .addField("setq3", "Set the third question on your ticket")
      
      message.channel.send(embed)
    }
}