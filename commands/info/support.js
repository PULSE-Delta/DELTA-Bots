const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'support',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
        let sEmbed = new MessageEmbed()
        .setAuthor(message.author.username)
        .setColor("PINK")
        .setTitle("Click here to join the\nsupport server!")
        .setURL("https://discord.gg/whUvHCf")
        .setFooter("Made by Pulse")
        .setColor("BLURPLE")
        .setTimestamp();
      
        message.channel.send(sEmbed);
    }
}