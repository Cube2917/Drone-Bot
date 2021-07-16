module.exports = {
    name: 'profile',
    description: "prints out a profile for drones",
    execute(message, args, Discord, fs){
        const mention = message.mentions.users.first();

        if(mention && mention.id != '856738757332041728'){
            let drone = message.guild.members.cache.get(mention.id).user;
            let dronePath = './users/' + mention.id + '.json';
            prof(drone, dronePath, Discord, fs, message);
        }else{
            let drone = message.author;
            let dronePath = './users/' + message.author.id + '.json';
            prof(drone, dronePath, Discord, fs, message);
        }
        

    }
}

function prof(drone, dronePath, Discord, fs, message){
    var droneFile;

    try{
        droneFile = fs.readFileSync(dronePath, 'utf8');
    }catch(err){
        if(err.code === 'ENOENT'){
            var newDrone = {"name": drone.username,
                "id": drone.id,
                "maker": "",
                "makerid": "",
                "numdrones": 0,
                "makerarray": [],
                "makeridarray": []
            }
            droneFile = JSON.stringify(newDrone, null, 2);

            fs.writeFile(dronePath, droneFile, function(err){
                if(err) return console.log(err);
            });
        }else{
            throw err;
        }
    }
    let droneJSON = JSON.parse(droneFile);

    var maker;
    if(droneJSON.maker == ''){
        maker = 'N/A'
    }else{
        maker = droneJSON.maker
    }

    var makerString = '';
    if(droneJSON.hasOwnProperty('makerarray')){
        if(droneJSON.makerarray.length == 0){
            makerString = 'N/A'
        }else if(droneJSON.makerarray.length == 1){
            makerString = maker;
        }else{
            for(var i = 0; i < droneJSON.makerarray.length; i++){
                makerString = makerString + droneJSON.makerarray[i] + ', ';
            }
        }
    }else{
        droneJSON["makerarray"] = [maker];
        droneJSON["makeridarray"] = [droneJSON.makerid];

        if(droneJSON.makerarray.length == 0){
            makerString = 'N/A'
        }else if(droneJSON.makerarray.length == 1){
            makerString = maker;
        }else{
            for(var i = 0; i < droneJSON.makerarray.length; i++){
                makerString = makerString + droneJSON.makerarray[i] + ', ';
            }
        }

        fs.writeFile(dronePath, JSON.stringify(droneJSON, null, 2), function(err){
            if(err) return console.log(err);
        });
    }

        

    let newEmbed = new Discord.MessageEmbed()
    .setTitle(drone.username)
    .setThumbnail('https://i.imgur.com/A61B7OM.jpg')
    .addFields(
        {name: 'Original MAKER', value: maker},
        {name: 'Active MAKER(s)', value: makerString},
        {name: 'Number of Drones', value: droneJSON.numdrones}
    )
    .setFooter('Drone Bot');

    message.channel.send(newEmbed);
}