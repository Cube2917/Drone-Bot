module.exports = {
    name: 'tree',
    description: "shows all the drones above it",
    execute(message, args, Discord, fs){
        const mention = message.mentions.users.first();

        var final;
        if(mention && mention.id != '856738757332041728'){
            let drone = message.guild.members.cache.get(mention.id).user
            let dronePath = './users/' + mention.id + '.json';
            let start = mention.id;
            let first = true;
            final = link(dronePath, message, Discord, fs, drone.username, null, first)
        }else{
            let dronePath = './users/' + message.author.id + '.json';
            let start = message.author.id;
            let first = true;
            final = link(dronePath, message, Discord, fs, message.author.username, null, first)
        }

        message.channel.send(final);
    }
}

function link(dronePath, message, Discord, fs, final, prev, first){
    var droneFile;

    try{
        droneFile = fs.readFileSync(dronePath, 'utf8');
    }catch(err){
        if(err.code === 'ENOENT'){
            message.reply('MAKER not found');
            throw err;
        }else{
            throw err;
        }
    }

    let droneJSON = JSON.parse(droneFile);

    if(prev != null && droneJSON.makerid == prev.id && first == false){
        return final = final + ' to infinite loop.'
    }

    if(droneJSON.makerid == ''){
        return final + ' < Original MAKER';
    }else{
        final = final + ' < ' + droneJSON.maker;
        first = false;
        prev = droneJSON;
        let makerPath = './users/' + droneJSON.makerid +'.json';
        return link(makerPath, message, Discord, fs, final, prev, first);
    }

}