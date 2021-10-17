const Discord = require('discord.js')
const { prefix } = require('../config.json');

module.exports = (client) => {


    client.on("message", async message => {

      let messageArray = message.content.split(" ");
      let command = messageArray[0];
      let args = messageArray.slice(1);
      
      if(command === `${prefix}serverinfo`) {

          const embed = new Discord.MessageEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL)
          .setColor(3447003)
          .setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
          .addField('Member Count', `${message.guild.memberCount - message.guild.members.cache.filter(m=>m.user.bot).size} (${message.guild.members.cache.filter(m=>m.user.bot).size} bots)`, true)
          .addField('AFK Timeout', `${message.guild.afkTimeout / 60} minutes`, true)
          .addField('AFK Channel', `${message.guild.afkChannelID === null ? 'No AFK Channel' : client.channels.get(message.guild.afkChannelID).name} (${message.guild.afkChannelID === null ? '' : message.guild.afkChannelID})`, true)
          .addField('Location', message.guild.region, true)
          .addField('Created', message.guild.createdAt.toLocaleString(), true)
          .setTimestamp()
          message.channel.send({embed});
        
                  };
        

        });
  
          };