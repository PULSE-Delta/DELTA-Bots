const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'help',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(args[0]) return message.reply("Invalid formatting!")
      
      const embed = new MessageEmbed()
      .setTitle("Help for Ticket Master")
      .setDescription("Prefix: !")
      .setColor("PURPLE")
      .addField("setup", "Instructions on how to setup the bot")
      .addField("new", "Create a ticket for the support team")
      .addField("close", "Delete the ticket")
      .addField("archive", "Let admins view the ticket after it's done")
      .addField("status", "Check if your guild is premium or not.")
      .addField("join", "Get Premium status on your server")
      .addField("claim", "Claim the ticket for yourself!")
      .addField("unclaim", "Allow the support team to see the ticket again.")
      .addField("invite", "Add the bot to your server")
      .addField("info", "View the bot's information")
      .addField("support", "Join the support server")
      .addField("open", "Show the amount of tickets open at the moment")
      .addField("tickets", "Check the amount of tickets every made in your server")
      .addField("Moderator", "Zeige die Mod commands")
      .setTimestamp()
      .setFooter("Developed by Pulse");
      message.channel.send(embed)
    }
}