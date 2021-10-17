const Discord = require('discord.js')
const { prefix } = require('../config.json');

module.exports = (client) => {


    client.on("message", message => {

      let messageArray = message.content.split(" ");
      let command = messageArray[0];
      let args = messageArray.slice(1);
      
      const userMention = message.mentions.users.first() || message.author;
      const memberMention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);;
  
      let userinfo = {};
      userinfo.bot = userMention.bot;
      userinfo.createdat = userMention.createdAt;
      userinfo.discrim = userMention.discriminator;
      userinfo.id = userMention.id;
      userinfo.mfa = userMention.mfaEnabled;
      userinfo.pre = userMention.premium;
      userinfo.presen = userMention.presence;
      userinfo.tag = userMention.tag;
      userinfo.uname = userMention.username;
      userinfo.verified = userMention.verified;
  
      userinfo.avatar = userMention.avatarURL;
  
      const rolesOfTheMember = memberMention.roles.cache.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')
  if(command === `${prefix}userinfo`) {
      var myInfo = new Discord.MessageEmbed()
          .setAuthor(userinfo.uname, userinfo.avatar)
          .addField("Bot?",userinfo.bot, true)
          .addField("Created At",userinfo.createdat, true)
          .addField("Discriminator",userinfo.discrim, true)
          .addField("Client ID",userinfo.id, true)
          .addField("2FA/MFA Enabled?",userinfo.mfa, true)
          .addField("Paid Account?",userinfo.pre, true)
          .addField("Presence",userinfo.presen, true)
          .addField("Client Tag",userinfo.tag, true)
          .addField("Username",userinfo.uname, true)
          .addField("Verified?",userinfo.verified, true)
          .setColor(0xf0e5da)
          .setTimestamp()
          .setTitle("About this user...")
          .setThumbnail(userinfo.avatar)
  
  
          message.channel.send(myInfo);
          };


        });
  
          };