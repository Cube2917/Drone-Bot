module.exports = {
    name: 'designation',
    description: "allows a drones maker to set its name",
    execute(message, args, fs){
        const mention = message.mentions.users.first()
        if(mention || mention.id != '856738757332041728'){
            let drone = message.guild.members.cache.get(mention.id);
            let dronePath = './users/' + mention.id + '.json';
            var droneFile;
            try{
                droneFile = fs.readFileSync(dronePath, 'utf8');
            }catch(err){
                if(err.code === 'ENOENT'){
                    message.reply('Drone cannot change this Drones designation for it is not this Drones MAKER.');
                    throw err;
                }else{
                    throw err;
                }
            }
            let droneJSON = JSON.parse(droneFile);
            if(droneJSON.maker == '' || message.author.id != droneJSON.makerid){
                message.reply('Drone cannot change this Drones designation for it is not this Drones MAKER.');
            }else{
                const newName = args.slice(1).join(' ');
                if(newName.length > 32 || newName.length == 0){
                    message.reply('Designation is too long');
                }else{

                    try{
                        droneJSON.name = newName;
                        fs.writeFileSync(dronePath, JSON.stringify(droneJSON, null, 2), function writeJSON(err) {
                            if (err) return console.log(err);
                        });
                        drone.setNickname(newName);
                        message.reply('Designation set successfully');
                    }catch(err){
                        message.reply('Designation failed. Check the bots permissions or try again.');
                    }
                }
            }
        }else{
            message.reply('Not a user');
        }
    }
}