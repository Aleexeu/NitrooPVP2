const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json"); 



client.on('ready', () =>{
    let status = [
        {name: 'Ajuda?│/ajuda', type: 'STREAMING', url: 'https://twitch.tv/srmisterii'},
        {name: 'Braains.io', type: 'LISTENING'},
        {name: '😉Steam😉', type: 'PLAYING'},
        {name: 'NitrooPVP│YouTube', type: 'WATCHING'},
      ];
      
      //STREAMING = Transmitindo
      //LISTENING = Ouvindo
      //PLAYING = Jogando
      //WATCHING = Assistindo
      
        function setStatus() {
            let randomStatus = status[Math.floor(Math.random() * status.length)];
            client.user.setPresence({game: randomStatus});
        }
      
        setStatus();
        setInterval(() => setStatus(), 10000);  //10000 = 10Ms = 10 segundos
});

client.on("guildCreate", guild => {
  console.log(`O Nighty BOT entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores.`);
});

client.on("guildDelete", guild => {
  console.log(`O Nighty BOT foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores.`);
});


client.on("message", async message => {
  let responseObject = {
    "oi" : "Olá, como você está hoje?",
    "bem" : "Que bom que você está bem :slight_smile:"
  };
  
  if (responseObject[message.content]){
    message.channel.send(responseObject[message.content]);
  }

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    message.delete().catch(O_o=>{});
    m.edit(`${message.member}, Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  if(comando === "apagar") {
    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
    const deleteCount = parseInt(args[0], 10);
    message.delete().catch(O_o=>{});
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Coloque ou forneça um número entre 2 e 100 para remover as mensagens!");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
  if(comando === "aviso") { 
    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send("@everyone\n\n"+ sayMessage);
  }
  if(comando === "urgente") { 
    if(!message.member.hasPermissions("BAN_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send("@here\n\n"+ sayMessage);
  }
  if(comando === "ajuda") {
    const deleteCount = parseInt(args[0], 10);
    message.delete().catch(O_o=>{});
    message.reply("\n\nComandos do BOT:\n\nAdministradores:\n- !apagar <2 a 100> - Apagar as mensagens do chat.\n- !aviso <mensagem> - Avisar o servidor do discord.\n\nMembros:\n- !ping - Para ver seu ping/ms.\n- !criador - Para ver quem e meu Pai/Criador.");
  }
  if(comando === "mcskin"){
    let reason = args.slice(0).join(' ');
      if (reason.length < 1) return message.reply('**Cite um nick de minecraft!**');
      
      let embed = new Discord.RichEmbed()
    
      .setTitle(`:minecraftdirt: ${args[0]}`)
    .setImage(`https://mc-heads.net/skin/${args[0]}`)
     .setFooter(message.author.tag,message.author.avatarURL )
      .setTimestamp(new Date())
      .setColor('#00BFFF')
      message.channel.send(embed)
    }
    if(comando === `humano`) {
        if(message.author.bot) return;
        if(message.channel.id === "465310587719516180") {
            if(message.content === "/humano") message.member.addRole("502167468702433280")
         message.channel.send('Humano!')
        }
        
        }
    if(comando === `zombie`) {
        if(message.author.bot) return;
        if(message.channel.id === "465310587719516180") {
            if(message.content === "/zombie") message.member.addRole("502167548977217566")
         message.channel.send('Zombi!')
        }
            
        }
});

client.login(config.token);
