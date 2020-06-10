const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
const userTickets = new Map();
module.exports={
    name: 'new',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      if(args[0]) return;
      
      if((args[0]) === "bug") return;
      if((args[0]) === "report") return;
      if((args[0]) === "payment") return;
      if((args[0]) === "general") return;
      
     const embed = new MessageEmbed()
     .setTitle("Create a Ticket")
     .setDescription("Here are the ticket categories")
     .setColor("YELLOW")
     .addField("Make sure your Staff Team is set!", "Admins can do this by using !setstaff (role)")
     .addField("!new bug", "Report a bug to staff")
     .addField("!new report", "Report a user in the server")
     .addField("!new payment", "Have your payment issues resolved")
     .addField("!new general", "A general ticket for questions & help of the server")
     .setTimestamp()
     .setFooter("Made by Pulse");
     
     message.channel.send(embed);
      
    }
}