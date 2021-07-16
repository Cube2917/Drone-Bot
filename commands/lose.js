const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'lose',
    description: "LOSER BUTTON",
    execute(client, message, args, disbut){
        const id = makeid(9);
        
        let button = new disbut.MessageButton()
        .setLabel('❌')
        .setStyle('red')
        .setID(id);

        var lost = 0;

        message.channel.send(`TIMES LOST: ${lost}`, button).then(sent =>{
            setTimeout(() => sent.edit(`FINAL TIMES LOST: ${lost}`, null), 120000);
        });


        client.on('clickButton', async (button) => {
            if(button.id === id && button.clicker.user.id === message.author.id){
                await button.reply.defer();
                
                lost++;
                button.message.edit(`TIMES LOST: ${lost}`);
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