const Discord = require('discord.js');

const client = new Discord.Client();

const ban = require('./commands/ban')

const boot = require('./commands/boot')
const kick = require('./commands/kick')
const serverinfo = require('./commands/serverinfo')
const slowmode = require('./commands/slowmode')
const unban = require('./commands/unban')
const unboot = require('./commands/unboot')
const userinfo = require('./commands/userinfo')


client.once('ready', () => {

    console.log(`Property of Justin W.`);


    //client.user.setActivity(`statusHere `, { type: 'WATCHING' }).catch(console.error);

});



ban(client)
boot(client)
kick(client)
serverinfo(client)
slowmode(client)
unban(client)
unboot(client)
userinfo(client)

client.login('ODkwMTE3NjIzMjY4OTE3Mjg4.YUrIog.nzt-HEhEwG13ZlDVFboMVy2JxNY')