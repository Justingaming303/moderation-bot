const Discord = require('discord.js')
const { prefix, masterRoles } = require('../config.json');

module.exports = (client) => {


    client.on("message", message => {

        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        if (command === `${prefix}unban`) {

            if (!message.member.roles.some(masterRoles)) return message.channel.send('<a:no:837213347518611467> You do not have permissions to execute this command!')


            const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
            if (!member) return message.channel.send('<a:no:837213347518611467> Please provide a member to unban!')

            if (message.guild.member(member)) return message.channel.send('<a:no:837213347518611467> The user is not banned or is in this server!')

            try {
                message.guild.members.unban(member)
                const w = message.channel.send(`<a:yes:837213346402271262> ${member.name} has been unbanned!`)
                const unban = new Discord.MessageEmbed()
                    .setTitle(`User Unbanned | ${member.user.tag} (${member.id})`)
                    .addFields([
                        { name: 'Unbanned By:', value: message.author.tag, inline: true },
                        { name: 'Server:', value: message.guild.name, inline: true },
                        { name: "Link:", value: w.url }
                    ])
                log.send(unban)

            } catch (err) {
                message.channel.send("Couldn't unban the member!")
                return;
            }





        };


    });

};