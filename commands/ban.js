const Discord = require("discord.js");
const { prefix, masterRoles, logChannel } = require("../config.json");

module.exports = (client) => {


  client.on('message', message => {

    const log =  message.guild.channels.cache.get(logChannel)
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (command === `${prefix}ban`) {
      if (!message.member.roles.some(masterRoles)) return message.channel.send('<a:no:837213347518611467> You do not have permissions to execute this command!')


      const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
      if (!member) return message.channel.send('<a:no:837213347518611467> Please provide a member to ban!')


      let time = ms(args[1]);
      if (!time || time > 1209600000) 
        return message.channel.send('<a:no:837213347518611467> Please enter a length of time of 14 days or less (1s/m/h/d)');


      let reason = args.slice(2).join(" ");
      if (!reason) reason = "No reason given!"

      if (!message.guild.client.hasPermission(["BAN_MEMBERS, ADMINISTRATOR"])) return message.channel.send('<a:no:837213347518611467> I don\'t have permissions to execute this command!')

      message.delete()

      const tryban = 

        member.ban({ days: 1, reason: reason }).then(() =>member.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`))


      if (tryban) {
        if (!time) {
          
           message.channel.send(`<a:yes:837213346402271262> ${member.user.tag} has been banned permanently!`)
           const notime = new Discord.MessageEmbed()
           .setTitle(`User Banned | ${member.user.tag} (${member.id})`)
           .addFields([
             {name: 'Banned By:', value: message.author.nickname || message.author.tag, inline: true},
             {name: 'Server:', value: message.guild.name, inline: true},
             {name: "Link:", value: logLink.url},
             {name: "Reason", value: 'No Reason'}

           ])
           message.channel.send(`<a:yes:837213346402271262> ${member.user.tag} has been banned!}**!`)
          const logLink = await log.send(notime)
        }

        if(time) {
          const time = new Discord.MessageEmbed()
           .setTitle(`User Banned | ${member.user.tag} (${member.id})`)
           .addFields([
             {name: 'Banned By:', value: message.author.nickname || message.author.tag, inline: true},
             {name: 'Server:', value: message.guild.name, inline: true},
             {name: "Link:", value: logLink.url},
             {name: "Reason", value: reason}

           ])

        
             message.channel.send(`<a:yes:837213346402271262> ${member.user.tag} has been banned for **${ms(time, { long: true })}**!`)
             log.send(time)
        }

      }

      member.timeout = message.client.setTimeout(async () => {
        try {
            message.guild.unban(member)
          const embed = new Discord.MessageEmbed()
            .setTitle('Member Unbanned')
            .setDescription(`<a:yes:837213346402271262> ${member} has been Unbanned.`)
            .setTimestamp()
            .setFooter(member.guild.name)
          message.channel.send(embed);
        } catch (err) {
          console.log(err)
            return; 
        }
      }, time);



     







    }







  })
}