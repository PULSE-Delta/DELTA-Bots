const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'invite',
    category: 'info',
    description: 'Invite the bot to your server',
    run: async(bot,message,args)=>{
        if (args[0]) return message.reply("You may not do that!");
  let iEmbed = new MessageEmbed()
  .setAuthor(message.author.tag)
  .setTitle("Click here to add DELTA Ticket to your server!")
  .setURL("https://discord.com/api/oauth2/authorize?client_id=715860501732786206&permissions=8&scope=bot")
  .setColor("RED")
  .setFooter("Made by Pulse")
  .setTimestamp();

  message.channel.send(iEmbed);
    }
}