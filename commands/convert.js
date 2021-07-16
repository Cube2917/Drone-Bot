const { MessageButton, MessageActionRow } = require('discord-buttons');


module.exports = {
    name: 'convert',
    description: 'converts someone into a drone',
    execute(client, message, args, fs, disbut){
        
        const mention = message.mentions.users.first();
        
        if(mention && mention.id != '856738757332041728' || mention.id != message.author.id){
            let drone = message.guild.members.cache.get(mention.id);

            const confirmID = makeid(9);
            const denyID = makeid(9);
            
            let confirm = new disbut.MessageButton()
            .setStyle('green')
            .setLabel('Accept')
            .setID(confirmID)

            let deny = new disbut.MessageButton()
            .setStyle('red')
            .setLabel('Deny')
            .setID(denyID)

            let row = new disbut.MessageActionRow()
            .addComponent(confirm)
            .addComponent(deny)
        
            message.channel.send(message.author.username + ' wishes to become your MAKER. Do you accept?',{ component: row });

            client.on('clickButton', async (button) => {
                if (button.id === confirmID && button.clicker.user.id === drone.user.id) {
                    await button.reply.defer().catch(err => {
                        console.log('Failed Confirm');
                    });
            
                    setTimeout(() => {
                        let dronePath = './users/' + mention.id + '.json';

                        var droneFile;
                        try{
                            droneFile = fs.readFileSync(dronePath, 'utf8');
                        }catch(err){
                            if(err.code === 'ENOENT'){
                                var newDrone = {"name": drone.user.username,
                                    "id": mention.id,
                                    "maker": "",
                                    "makerid": "",
                                    "numdrones": 0,
                                    "makerarray": [],
                                    "makeridarray": []
                                }
                                droneFile = JSON.stringify(newDrone, null, 2);
                            }else{
                                throw err;
                            }
                        }
                        let droneJSON = JSON.parse(droneFile);
                        
                        if(droneJSON.maker == ''){
                            droneJSON.maker = message.author.username;
                            droneJSON.makerid = message.author.id;

                            if(droneJSON.hasOwnProperty('makerarray')){
                                droneJSON.makerarray.push(message.author.username);
                            }else{
                                droneJSON["makerarray"] = [message.author.username];
                            }

                            if(droneJSON.hasOwnProperty('makeridarray')){
                                droneJSON.makeridarray.push(message.author.id);
                            }else{
                                droneJSON["makeridarray"] = [message.author.id];
                            }
            
                            let maker = message.author;
                            let makerPath = './users/' + maker.id + '.json';
                
                            var makerFile;
                            try{
                                makerFile = fs.readFileSync(makerPath, 'utf8');
                            }catch(err){
                                if(err.code === 'ENOENT'){
                                    var newMaker = {"name": maker.username,
                                        "id": maker.id,
                                        "maker": "",
                                        "makerid": "",
                                        "numdrones": 0,
                                        "makerarray": [],
                                        "makeridarray": []
                                    }
                                    makerFile = JSON.stringify(newMaker, null, 2);
                                } 
                            }
                
                            let makerJSON = JSON.parse(makerFile);
                
                            makerJSON.numdrones = makerJSON.numdrones + 1;
                
                            fs.writeFileSync(dronePath, JSON.stringify(droneJSON, null, 2), function writeJSON(err){
                                if (err) return console.log(err);
                            });
                
                            fs.writeFileSync(makerPath, JSON.stringify(makerJSON, null, 2), function writeJSON(err){
                                if (err) return console.log(err);
                            });
                            button.message.edit(button.clicker.user.username + " has become a NULL Drone for " + message.author.username + "\nRemember that consent and safety are necessary.", { component : null });
                        }else{
                            if(droneJSON.hasOwnProperty('makerarray')){
                                droneJSON.makerarray.push(message.author.username);
                            }else{
                                droneJSON["makerarray"] = [message.author.username, droneJSON.maker];
                            }

                            if(droneJSON.hasOwnProperty('makeridarray')){
                                droneJSON.makeridarray.push(message.author.id);
                            }else{
                                droneJSON["makeridarray"] = [message.author.id, dorneJSON.makerid];
                            }
            
                            let maker = message.author;
                            let makerPath = './users/' + maker.id + '.json';
                
                            var makerFile;
                            try{
                                makerFile = fs.readFileSync(makerPath, 'utf8');
                            }catch(err){
                                if(err.code === 'ENOENT'){
                                    var newMaker = {"name": maker.username,
                                        "id": maker.id,
                                        "maker": "",
                                        "makerid": "",
                                        "numdrones": 0,
                                        "makerarray": [],
                                        "makeridarray": []
                                    }
                                    makerFile = JSON.stringify(newMaker, null, 2);
                                } 
                            }
                
                            let makerJSON = JSON.parse(makerFile);
                
                            makerJSON.numdrones = makerJSON.numdrones + 1;
                
                            fs.writeFileSync(dronePath, JSON.stringify(droneJSON, null, 2), function writeJSON(err){
                                if (err) return console.log(err);
                            });
                
                            fs.writeFileSync(makerPath, JSON.stringify(makerJSON, null, 2), function writeJSON(err){
                                if (err) return console.log(err);
                            });
                            button.message.edit(button.clicker.user.username + " has become a NULL Drone for " + message.author.username + "\nRemember that consent and safety are necessary.", { component : null });
                        }
                    }, 1000);
                }else if(button.id === denyID && button.clicker.user.id === drone.user.id){
                    await button.reply.defer().catch(err => {
                        console.log('Failed Deny');
                    });
            
                    setTimeout(() => {
                        button.message.edit("Dronification failed.", { component : null });
                    }, 1000);
                }else{
                    await button.reply.defer().catch(err=>{
                        console.log('Failed unauthorized press');
                    });
                }
            });
            
        }else{
            message.reply('Input is not a user');
        }
    }
}

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}