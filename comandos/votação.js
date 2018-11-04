const Discord = require("discord.js");

exports.run = (client, message, args) => {
if (!args.slice(0).join(' ')) return message.reply('Diga o conteudo da votaçao!')
    message.delete()
    message.channel.send('@everyone | @here')
    message.channel.send({embed:{
        'title':'<a:RingingBell:508676600532041731> SlimeMC | Votação',
        'description':args.slice(0).join(' ')
        ,'color':message.member.highestRole.color,
    }}).then(msg => {
    msg.react("👍").then(r => msg.react("👎"))
    })
    
}

exports.help = {
    name: "votação"
}