const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json"); 


client.on('ready', () => {
    client.user.setPresence({ game: { name: `» IP: Em desenvolvimento!`, type: 1, url: 'https://www.youtube.com/yRecky'} });
    console.log('Logado');
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  if(comando === "formulário") {
    const m = await message.channel.send("Aqui está: https://adflyk.com/k9BTbz");
  }
  if(comando === "say") { 
    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }
  if(comando === "changelog") {
    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
      message.delete().catch(O_o=>{});
       if (!args.slice(0).join(' ')) return message.reply('Diga o conteudo da changelog!')
       message.channel.send({embed:{
      'title':':book: CHANGELOG - SPACE NETWORK :book:',
      'description':args.slice(0).join(' ')
      ,'color':message.member.highestRole.color,
      "thumbnail":{
        url: 'https://minotar.net/bust/JonhyPedraBR/100.png'
          }
       }}).then(m =>{
       m.react(e1).then(m.react(e2))
  })
}
});

client.login(config.token);
