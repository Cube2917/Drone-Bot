module.exports = {
    name: 'agree',
    description: "Agree to the rules of the server",
    execute(message, args){
        if(message.guild.id == '858541114330710056' && !message.member.roles.cache.find(role => role.id == '858543008625328138')){
            const userRole = message.guild.roles.cache.find(role => role.id == '858543008625328138');
            message.member.roles.add(userRole);
            message.delete();
        }else{
            message.reply('Command failed.').then(sent =>{
                setTimeout(() => sent.delete(), 10000);
            });
            message.delete();
        }
    }
}