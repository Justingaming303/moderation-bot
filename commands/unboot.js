const Discord = require('discord.js')
const { prefix, masterRoles } = require('../config.json');
const ms = require('ms')
module.exports = (client) => {


    client.on("message", async message => {

        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        if (command === `${prefix}boot`) {


            if (!message.member.roles.some(masterRoles)) return message.channel.send('<a:no:837213347518611467> You do not have permissions to execute this command!')
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!member)
                return message.channel.send('<a:no:837213347518611467> Please provide a user or the user is not in this server!');
            if (member === message.guild.client) return message.channel.send(message, 0, '<a:no:837213347518611467> You cannot mute the bot!');

           

            try {
                message.guild.channels.cache.forEach(channel => {
                    if (channel.type === "text") {

                        channel.updateOverwrite(member, {
                            SEND_MESSAGES: true,
                            SPEAK: true,
                            ADD_REACTIONS: true,
                            READ_MESSAGE_HISTORY: true
                        });

                        const unbootEmbed = new Discord.MessageEmbed()
                            .description(`${member.name} has been unbooted from all channels by ${message.author.name}.`)
                        const w = message.channel.send(unbootEmbed);

                        const unboot = new Discord.MessageEmbed()
                        .setTitle(`User Unbooted | ${member.user.tag} (${member.id})`)
                        .addFields([
                          {name: 'Unbooted By:', value: message.author.tag, inline: true},
                          {name: 'Server:', value: message.guild.name, inline: true},
                          {name: "Link:", value: w.url}
                        ])
                        log.send(unboot)

                    };
                });

            } catch (err) {
       
                message.channel.send("<a:no:837213347518611467> Unable to boot the user!!")
                return;
            }
        }


    });

};