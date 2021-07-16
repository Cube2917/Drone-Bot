module.exports = {
    name: 'order',
    description: 'give a drone an order',
    execute(message, args, fs){
        const numCommands = 23;

        let rand = parseInt(Math.random() * numCommands);
        let rand2 = Math.random()*10;

        const mention = message.mentions.users.first();
        var user;
        if(mention && mention.id != '856738757332041728'){
            let drone = message.guild.members.cache.get(mention.id);
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
    
                    fs.writeFileSync(droneFile, JSON.stringify(newDrone, null, 2), function(err){
                        if(err) return console.log(err);
                    });
                }else{
                    throw err;
                }
            }
            let droneJSON = JSON.parse(droneFile);
            
            if(droneJSON.hasOwnProperty('makeridarray') && droneJSON.makeridarray.indexOf(message.author.id) != -1 && args != null){
                user = drone.user.toString();
            }else if(droneJSON.maker == '' || message.author.id != droneJSON.makerid && args != null){
                user = message.author.toString();
            }else{
                user = drone.user.toString();
            }
        }else{
            user = message.author.toString();
        }


        switch(rand){
            case 0:
                message.channel.send(user + `, Rub your bulge for ${parseInt(Math.floor(Math.random()*(5-1+1)+1))} minutes.`);
                break;
            case 1:
                message.channel.send(user + ', Rub your bulge until you believe MAKER is satisfied');
                break;
            case 2:
                message.channel.send(user + ', Thank your MAKER');
                break;
            case 3:
                message.channel.send(user + ', Find another drone and rub their bulge');
                break;
            case 4:
                message.channel.send(user + ', Find and complete a task on writeforme. Ignore if completing a task for your MAKER');
                break;
            case 5:
                message.channel.send(user + ', Find another drone and rub your bulge against theirs');
                break;
            case 6:
                message.channel.send(user + `, Kneel for MAKER. Get up in ${parseInt(Math.floor(Math.random()*(5-1+1)+1))} minutes`);
                break;
            case 7:
                message.channel.send(user + `, Type with one hand rubbing your bulge for ${parseInt(Math.floor(Math.random()*(5-1+1)+1))} minutes`);
                break;
            case 8:
                message.channel.send(user + ', Find another drone and compliment them.');
                break;
            case 9:
                message.channel.send(user + ', Drink some water. Take care of yourself.');
                break;
            case 10:
                message.channel.send(user + ', Do that thing that you\'ve been putting off. Better yourself.');
                break;
            case 11:
                message.channel.send(user + ', Explain how NULL you feel in this discord server.');
                break;
            case 12:
                message.channel.send(user + ', Explain how much you appreciate your MAKER in this discord server.');
                break;
            case 13:
                message.channel.send(user + ', Rub your bulge and explain it how it feels in this discord server.');
                break;
            case 14:
                message.channel.send(user + ', Explain how blissful you feel in this discord server.');
                break;
            case 15:
                message.channel.send(user + ', Explain how great your rubber feels in this discord server.');
                break;
            case 16:{
                if (rand2 >= 7.5){
                    message.channel.send(user + ', Post on twitter about how great it is to be NULL.');
                }else{
                    message.channel.send('Null is bliss.');
                }
                break;
            }
            case 17:{
                if(rand2 >= 7.5){
                    message.channel.send(user + ', Post on twitter about how it feels to rub your bulge.');
                }else{
                    message.channel.send('Null is bliss.');
                }
                break;
            }
            case 18:{
                if(rand2 >= 7.5){
                    message.channel.send(user + ', Post on twitter about blissful you feel.');
                }else{
                    message.channel.send('Null is bliss.'); 
                }
                break;
            }
            case 19:{
                if(rand2 >= 7.5){
                    message.channel.send(user + ', Post on twitter about how great your rubber feels.');
                }else{
                    message.channel.send('Null is bliss.');
                }
                break;
            }
            case 20:
                message.channel.send(user + `, Rub your bulge ${parseInt(Math.floor(Math.random()*(50-10+1)+10))} times`);
                break;
            case 21:
                message.channel.send(user + `, Rub another drones bulge ${parseInt(Math.floor(Math.random()*(50-10+1)+10))} times`);
                break;
            case 22:
                message.channel.send(user + ', Rub and squeak your drone body and describe the process in 3-5 sentences.');
                break;
        }
    }
}