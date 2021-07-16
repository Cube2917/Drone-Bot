module.exports = {
    name: 'neopronouns',
    description: "allows users to set their own neopronouns",
    execute(message, args){
        const pronouns = args.slice(0).join(' ');

        if(message.member.roles.cache.find(role => role.name == pronouns)){
            const role = message.guild.roles.cache.find(role => role.name == pronouns);
            message.member.roles.remove(role);
        }else{
            if(!message.guild.roles.cache.find(role => role.name == pronouns)){
                message.guild.roles.create({
                    data:{
                        name: pronouns,
                        permissions: 0
                    }
                }).then(role =>{
                    message.member.roles.add(role);
                });
            }else{
                const role = message.guild.roles.cache.find(role => role.name == pronouns);
                if(message.member.permissions.toArray().length < role.permissions.toArray().length){
                    message.reply('Cannot add a role with more permissions');
                }else{
                    message.member.roles.add(role);
                }
            }
        }
    }
}
