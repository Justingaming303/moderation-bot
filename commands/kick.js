const Discord = require("discord.js");
const { prefix, masterRoles } = require("../config.json");

module.exports = (client) => {



//<a:no:837213347518611467> 
//<a:yes:837213346402271262>

  client.on('message', message => {


    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (command === `${prefix}kick`) {
      if (!message.member.roles.some(masterRoles)) return message.channel.send('<a:no:837213347518611467> You do not have permissions to execute this command!')


      const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
      if (!member) return message.channel.send('<a:no:837213347518611467> Please provide a member to kick!')


      let reason = args[0]
      if (!reason) reason = "No reason given!"

      if (!message.guild.client.hasPermission(["BAN_MEMBERS, ADMINISTRATOR"])) return message.channel.send('<a:no:837213347518611467> I don\'t have permissions to execute this command!')

      message.delete()

      member.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`)
      try {
        member.kick(reason)
        const w = message.channel.send(`<a:yes:837213346402271262> ${member.name} has been kicked!`)
        const kick = new Discord.MessageEmbed()
                    .setTitle(`User Kicked | ${member.user.tag} (${member.id})`)
                    .addFields([
                        { name: 'Kicked By:', value: message.author.tag, inline: true },
                        { name: 'Server:', value: message.guild.name, inline: true },
                        { name: "Link:", value: w.url }
                    ])
                log.send(unban)
      } catch (err) {
          message.channel.send("Member's highest role is higher than me!")
      }

    }







  })
}