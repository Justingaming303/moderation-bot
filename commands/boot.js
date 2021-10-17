const Discord = require('discord.js')
const { prefix, masterRoles, logChannel } = require('../config.json');
const ms = require('ms')
module.exports = (client) => {


    client.on("message", async message => {
        const log =  message.guild.channels.cache.get(logChannel)
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        if (command === `${prefix}boot`) {


            if (!message.member.roles.some(masterRoles)) return message.channel.send('<a:no:837213347518611467> You do not have permissions to execute this command!')
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!member)
                return message.channel.send('<a:no:837213347518611467> Please provide a user or the user is not in this server!');
            if (member === message.guild.client) return message.channel.send(message, 0, '<a:no:837213347518611467> You cannot mute the bot!');
            if (member.roles.highest.position >= message.member.roles.highest.position)
                return message.channel.send('<a:no:837213347518611467> You cannot mute someone higher than you!');
            if (!args[1])
                return message.channel.send('<a:no:837213347518611467> Please enter a length of time of 14 days or less (1s/m/h/d)');
            let time = ms(args[1]);
            if (!time > 1209600000)
                return message.channel.send('<a:no:837213347518611467> Please enter a length of time of 14 days or less (1s/m/h/d)');

            if (!time) time = ms(3600000)

            let reason = args.slice(2).join(' ');
            if (!reason) reason = '`No Reason`';
            if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';


            try {
                message.guild.channels.cache.forEach(channel => {
                    if (channel.type === "text") {

                        channel.updateOverwrite(member, {
                            SEND_MESSAGES: false,
                            SPEAK: false,
                            ADD_REACTIONS: false,
                            READ_MESSAGE_HISTORY: true
                        });

                        const muteEmbed = new Discord.MessageEmbed()
                            .description(`${member.name} has been booted from all channels by ${message.author.name}.`)
                        const w = message.channel.send(muteEmbed);
                        const boot = new Discord.MessageEmbed()
                        .setTitle(`User Booted | ${member.user.tag} (${member.id})`)
                        .addFields([
                          {name: 'Booted By:', value: message.author.nickname || message.author.tag, inline: true},
                          {name: 'Server:', value: message.guild.name, inline: true},
                          {name: "Link:", value: w.url}
                        ])
                        log.send(boot)
                        
                    };
                });

            } catch (err) {
       
                message.channel.send("<a:no:837213347518611467> Unable to boot the user!!")
                return;
            }



            member.timeout = message.client.setTimeout(async () => {
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
                                .description(`${member.name} has been unbooted from all channels.`)
                            const a = message.channel.send(unbootEmbed);
                            const unboot = new Discord.MessageEmbed()
                            .setTitle(`User Unbooted | ${member.user.tag} (${member.id})`)
                            .addFields([
                              {name: 'Unbooted By:', value: 'Bot', inline: true},
                              {name: 'Server:', value: message.guild.name, inline: true},
                              {name: "Link:", value: a.url}
                            ])
                            log.send(unboot)
    
                        };
                    });
                } catch (err) {
                  return
                  
                }
            }, time);
        }


    });

};