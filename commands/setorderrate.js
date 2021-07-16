module.exports = {
    name: 'setorderrate',
    description : "sets the rate at which drone bot gives orders",
    execute(message, args, fs, serverList){
        if(message.member.hasPermission('ADMINISTRATOR')){
            const serverID = message.guild.id;
            let server = serverList.get(serverID);
            let serverName = './servers/' + server.id + '.json';

            switch(args[0].toUpperCase()){
                case "FAST":
                    server.rate = 100;
                    message.reply('Success!');
                    break;
                case "NORMAL":
                    server.rate = 250;
                    message.reply('Success!');
                    break;
                case "SLOW":
                    server.rate = 500;
                    message.reply('Success!');
                    break;
                default:
                    message.reply('Not an acceptable argument.');
                    break;
            }
            fs.writeFileSync(serverName, JSON.stringify(server, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            });
        }else{
            message.reply('User does not have permission to do this.');
        }
    }
}