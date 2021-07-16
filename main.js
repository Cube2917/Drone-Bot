const Discord = require('discord.js');

const client = new Discord.Client();

require('discord-buttons')(client);
const disbut = require('discord-buttons');

const prefix = '#';

const fs = require('fs');

client.commandList = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commandList.set(command.name, command);
}

const serverFiles = fs.readdirSync(`./servers/`).filter(file => file.endsWith('.json'));

let serverList = new Discord.Collection();

for(const file of serverFiles){
    const server = require(`./servers/${file}`);

    serverList.set(server.id, server);
}


const stats = require('./stats.json');
const keys = require('./keys.json');

var recent;

client.on('message', message =>{
    if(message.channel.id == '858544695248027720' && message.content != '#agree' && message.author.id != '856738757332041728'){
        message.delete();
    }
    
    const serverID = message.guild.id;
    let server = serverList.get(serverID);
    let rand = parseInt(Math.random()*server.rate)
    if(rand >= 25 && rand <= 35 && !message.author.bot && !message.content.startsWith(prefix) && message.author.id != recent && message.channel.id != '858544695248027720'){
        client.commandList.get('order').execute(message, null, fs);
        recent = message.author.id;
    }
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case('chat'):
            client.commandList.get('chat').execute(message, args);
            break;
        case('thank'):
            client.commandList.get('thank').execute(stats, message, args, fs);
            break;
        case('spread'):
            client.commandList.get('spread').execute(message, args, Discord);
            break;
        case('order'):
            client.commandList.get('order').execute(message, args, fs);
            break;
        case('help'):
            client.commandList.get('help').execute(message, args, Discord);
            break;
        case('guide'):
            client.commandList.get('guide').execute(message, args, Discord);
            break;
        case('ping'):
            client.commandList.get('ping').execute(message,args);
            break;
        case('setorderrate'):
            client.commandList.get('setorderrate').execute(message, args, fs, serverList);
            break;
        case('convert'):
            if (!args[0]) return message.reply('no argument');
            if (args[1]) return message.reply('Too many arguments');
            client.commandList.get('convert').execute(client, message, args, fs, disbut);
            break;
        case('profile'):
            client.commandList.get('profile').execute(message, args, Discord, fs);
            break;
        case('tree'):
            client.commandList.get('tree').execute(message, args, Discord, fs);
            break;
        case('designation'):
            if (!args[0]) return message.reply('no argument');
            client.commandList.get('designation').execute(message, args, fs);
            break;
        case('agree'):
            client.commandList.get('agree').execute(message, args);
            break;
        case('removemaker'):
            client.commandList.get('removemaker').execute(client, message, args, fs, disbut);
            break;
        case('avatar'):
            client.commandList.get('avatar').execute(message, args, Discord);
            break;
        case('pronoun'):
            client.commandList.get('pronoun').execute(client, message, args, disbut);
            break;
        case('adminpronouns'):
            client.commandList.get('adminpronouns').execute(client, message, args, disbut);
            break;
        case('neopronouns'):
            if (!args[0]) return message.reply('no argument');
            if (args[1]) return message.reply('Too many arguments');
            client.commandList.get('neopronouns').execute(message, args);
            break;
        case('admin'):
            client.commandList.get('admin').execute(message, args, Discord);
            break;
        case('lose'):
            client.commandList.get('lose').execute(client, message, args, disbut);
    }
});

client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    channel.send('MAKER thanks you for adding this drone to this server. Use #help for information');
    console.log('This drone has been added to ' + guild.name);


    var server = {"name" : guild.name,
        "id" : guild.id,
        "rate" : 500
    }

    let serverName = './servers/' + server.id +'.json';

    serverList.set(server.id, server);
    fs.writeFile(serverName, JSON.stringify(server, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });
});

client.once('ready', () =>{
    console.log('Drone is ready to obey MAKER');
});

client.login(keys.discord);