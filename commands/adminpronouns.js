const { MessageMenu, MessageMenuOption } = require('discord-buttons');

module.exports = {
    name: 'adminpronouns',
    description: "permanent pronoun menu",
    execute(client, message, args, disbut){
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            const heID = makeid(9);
        
            let he = new disbut.MessageMenuOption()
            .setLabel('he/him')
            .setEmoji('♂️')
            .setValue(heID)
            .setDescription('Male Pronouns');
    
            const sheID = makeid(9);
    
            let she = new disbut.MessageMenuOption()
            .setLabel('she/her')
            .setEmoji('♀️')
            .setValue(sheID)
            .setDescription('Female Pronouns');
    
            const theyID = makeid(9);
    
            let they = new disbut.MessageMenuOption()
            .setLabel('they/them')
            .setEmoji('🅾️')
            .setValue(theyID)
            .setDescription('Gender Neutral Pronouns');
    
            const itID = makeid(9);
    
            let it = new disbut.MessageMenuOption()
            .setLabel('it/its')
            .setEmoji('🤖')
            .setValue(itID)
            .setDescription('Drone/Object Pronouns');
    
            const menuID = makeid(9);
    
            let menu = new disbut.MessageMenu()
            .setID(menuID)
            .addOptions(he, she, they, it);
    
            message.channel.send('Select your pronouns!', menu);
            message.delete();
    
            client.on('clickMenu', async (menu) => {
                if(menu.values[0] === heID){    
                    await menu.reply.defer();
    
                    if(menu.clicker.member.roles.cache.find(role => role.name == 'he/him')){
                        const role = message.guild.roles.cache.find(role => role.name == 'he/him');
                        menu.clicker.member.roles.remove(role);
                    }
                    else{
                        var heRole;
                        if(!message.guild.roles.cache.find(role => role.name == 'he/him')){
                            message.guild.roles.create({
                                data: {
                                    name: 'he/him',
                                    permissions: 0
                                }
                            }).then(role =>{
                                menu.clicker.member.roles.add(role);
                            });
                        }else{
                            heRole = message.guild.roles.cache.find(role => role.name == 'he/him');
                            menu.clicker.member.roles.add(heRole);
                        }
        
                    }
                }else if(menu.values[0] === sheID){
                    await menu.reply.defer();
    
                    if(menu.clicker.member.roles.cache.find(role => role.name == 'she/her')){
                        const role = message.guild.roles.cache.find(role => role.name == 'she/her');
                        menu.clicker.member.roles.remove(role);
                    }else{
                        var sheRole;
                        if(!message.guild.roles.cache.find(role => role.name == 'she/her')){
                            message.guild.roles.create({
                                data: {
                                    name: 'she/her',
                                    permissions: 0
                                }
                            }).then(role =>{
                                menu.clicker.member.roles.add(role);
                            });
                        }else{
                            sheRole = message.guild.roles.cache.find(role => role.name == 'she/her');
                            menu.clicker.member.roles.add(sheRole);
                        }
                    }
                }else if(menu.values[0] === theyID){
                    await menu.reply.defer();
                    
                    if(menu.clicker.member.roles.cache.find(role => role.name == 'they/them')){
                        const role = message.guild.roles.cache.find(role => role.name == 'they/them');
                        menu.clicker.member.roles.remove(role);
                    }else{
                        var theyRole;
                        if(!message.guild.roles.cache.find(role => role.name == 'they/them')){
                            message.guild.roles.create({
                                data: {
                                    name: 'they/them',
                                    permissions: 0
                                }
                            }).then(role =>{
                                menu.clicker.member.roles.add(role);
                            });
                        }else{
                            theyRole = message.guild.roles.cache.find(role => role.name == 'they/them');
                            menu.clicker.member.roles.add(theyRole);
                        }
                    }
                }else if(menu.values[0] === itID){
                    await menu.reply.defer();
    
                    if(menu.clicker.member.roles.cache.find(role => role.name == 'it/its')){
                        const role = message.guild.roles.cache.find(role => role.name == 'it/its');
                        menu.clicker.member.roles.remove(role);
                    }else{
                        var itRole;
                        if(!message.guild.roles.cache.find(role => role.name == 'it/its')){
                            message.guild.roles.create({
                                data: {
                                    name: 'it/its',
                                    permissions: 0
                                }
                            }).then(role =>{
                                menu.clicker.member.roles.add(role);
                            });
                        }else{
                            itRole = message.guild.roles.cache.find(role => role.name == 'it/its');
                            menu.clicker.member.roles.add(itRole);
                        }
                    }
                }
            });
        }else{
            message.reply('User does not have permission to do this');
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