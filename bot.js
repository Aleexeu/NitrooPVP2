const Discord = require('discord.js');
const bot = new Discord.Client();


function changing_status() {
    let status = ['minecraft', 'fortnite', 'e beijando']
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random)
}

bot.on("ready", () => {
    console.log( '-' );
    setInterval(changing_status, 9000);
})

bot.on('guildMemberAdd', member => {
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
   
    let canal = member.guild.channels.find(`name`, "bem-vindo-📣");
    if (!canal) return;
  
    var embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setDescription(`🎈 **|** ${member} **Seja bem-vindo(a) ao nosso servidor.**`)
    canal.send({embed : embed})
  });

bot.on('message', message => {
    if (message.content.startsWith('/modd')){
        message.channel.send('http://www.modd.io/');
    }
    if (message.content.startsWith('/canal')){
        if(message.channel.id !== '500821240869814272') return message.channel.send('você não pode usar comandos aqui, vai em <#500821240869814272> e digite o comando!');
        message.channel.send('https://www.youtube.com/channel/UCNx4oMYW8osf3ea2wfEd5pg');
    }
    if (message.content.startsWith('/beijar')){
       
        let user = message.mentions.users.first();
        if(message.channel.id !== '500821240869814272') return message.channel.send('você não pode usar comandos aqui, vai em <#500821240869814272> e digite o comando!');
        if(!user) return message.channel.send('Você precisa mencionar alguém para beijar!');
        let gifs = ['https://media.giphy.com/media/1BcfiGlOGXzQ5xU4DA/giphy.gif'] 
        let random = Math.round(Math.random() * gifs.length);
        let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username} deu um beijo no(a) ${user.username}`)
            .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
            .setColor('#f2f1f2')
            .setTimestamp()
            message.channel.send(embed);
         }
    if (message.content.startsWith('/roleta')){
        if(message.channel.id !== '500821240869814272') return message.channel.send('você não pode usar comandos aqui, vai em <#500821240869814272> e digite o comando!');
        let a = ['Voce foi execultado! a bala foi certeira.', 'Voce teve sorte! a bala nao foi disparada.']
        let b = Math.floor(Math.random() * a.length)
         message.reply(a[b])
          }
});
bot.on('message', message => {
    let arraymsg = message.content.split(" ");
let cmd = arraymsg[0].toLowerCase()
let args = message.content.split(" ").slice(1);
if(cmd === '/anuncio'){
    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("Você não tem permissão para usar este comando.")
    const args = message.content.split(" ").slice(1);
    const prefix = '/'
    message.delete()
    if (!args.slice(0).join(' ')) return message.channel.send('test')
    message.channel.send({embed:{
        'description':args.slice(0).join(' ')
        ,'color':message.member.highestRole.color,
        "thumbnail":{
            }
        }
    }
    )
}
});
bot.on('message', message => {
    let arraymsg = message.content.split(" ");
let cmd = arraymsg[0].toLowerCase()
let args = message.content.split(" ").slice(1)
    if(cmd === '/ban'){
        const args = message.content.split(" ").slice(1);
        var razao = args.slice(1).join(" ")
            var membro = message.mentions.members.first();
            if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("Você não tem permissão para usar este comando.")
            if(!membro) return message.reply("Você não mencionou ninguém.")
            if(!membro.bannable) return message.reply("Você não pode banir essa pessoa.")
            if(razao.length < 1) return message.reply("Coloque um motivo!")
            membro.ban()
            message.channel.send(`O membro ${membro.user.username} foi banido do servidor.\nMotivo: ${razao}`)
      }
});

// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
