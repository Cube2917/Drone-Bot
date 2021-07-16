const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: 'removemaker',
    description: "removes maker",
    execute(client, message, args, fs, disbut){
        let drone = message.author.id;

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
    
        message.channel.send('Are you sure you want to reset your MAKER?',{ component: row });

        client.on('clickButton', async (button) => {
            if (button.id === confirmID && button.clicker.user.id === message.author.id) {
                await button.reply.defer().catch(err => {
                    console.log('Failed Confirm');
                });
        
                setTimeout(() => {
                    let dronePath = './users/' + message.author + '.json';

                    var droneFile;
                    try{
                        droneFile = fs.readFileSync(dronePath, 'utf8');
                    }catch(err){
                        if(err.code === 'ENOENT'){
                            button.message.edit('Drone does not have a MAKER', {component: null});
                            throw err;
                        }else{
                            throw err;
                        }
                    }
                    let droneJSON = JSON.parse(droneFile);
                    
                    let tempName = droneJSON.maker;
                    let temp = droneJSON.makerid

                    droneJSON.maker = '';
                    droneJSON.makerid = '';

                    if(droneJSON.hasOwnProperty("makerarray")){
                        const nameIndex = droneJSON.makerarray.indexOf(tempName);

                        if(nameIndex > -1){
                            droneJSON.makerarray.splice(nameIndex, 1);
                        }
                        
                        const idIndex = droneJSON.makeridarray.indexOf(temp);

                        if(idIndex > -1){
                            droneJSON.makeridarray.splice(idIndex, 1);
                        }
                    }
    
                    let makerPath = './users/' + temp + '.json';
        
                    var makerFile;
                    try{
                        makerFile = fs.readFileSync(makerPath, 'utf8');
                    }catch(err){
                        if(err.code === 'ENOENT'){
                            button.message.edit('Drone does not have a MAKER', {component: null});
                            throw err;
                        } 
                    }
        
                    let makerJSON = JSON.parse(makerFile);
        
                    makerJSON.numdrones = makerJSON.numdrones - 1;
        
                    fs.writeFileSync(dronePath, JSON.stringify(droneJSON, null, 2), function writeJSON(err){
                        if (err) return console.log(err);
                    });
        
                    fs.writeFileSync(makerPath, JSON.stringify(makerJSON, null, 2), function writeJSON(err){
                        if (err) return console.log(err);
                    });
                    button.message.edit('MAKER removed.', { component : null });
                }, 1000);
            }else if(button.id === denyID && button.clicker.user.id === message.author.id){
                await button.reply.defer().catch(err => {
                    console.log('Failed Deny');
                });
        
                setTimeout(() => {
                    button.message.edit("MAKER was not removed.", { component : null });
                }, 1000);
            }else{
                await button.reply.defer().catch(err=>{
                    console.log('Failed unauthorized press');
                });
            }
        });
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