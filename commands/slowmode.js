const { prefix, masterRoles } = require('../config.json');
const Discord = require('discord.js')
module.exports = (client) => {

    client.on("message", message => {


        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);



        if (command === `${prefix}slowmode`) {

            if (!message.member.roles.some(masterRoles)) return message.channel.send('<a:no:837213347518611467> You do not have the permission to do the command! ``/slowmode [number]``');
            if (!args[0]) return message.channel.send('<a:no:837213347518611467> You did not provide a duration of the slowmode! ``slowmode [number]``')
            var time = Number(args[0]);


            const embed = new Discord.MessageEmbed()
                .setTitle('Slowmode set!')
                .setDescription(`<a:yes:837213346402271262> ${message.channel}\'s slowmode has been set to ${time}(s)!`)
                .setTimestamp()







            try {
                message.channel.setRateLimitPerUser(time)
                message.channel.send(embed)
            } catch (err) {
                message.channel.send("<a:no:837213347518611467> Unable to set slowmode.")
            }
        }
        });
};