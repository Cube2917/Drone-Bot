module.exports = {
    name: 'admin',
    description: "shows a list of admin commands",
    execute(message, args, Discord){
        let newEmbed = new Discord.MessageEmbed()
        .setTitle('Admin Commands')
        .addFields(
            {name: 'setorderrate', value: "Sets the rate at which random orders are given.\nSyntax is #setorderrate {speed}\nSpeeds are FAST, NORMAL, and SLOW.\nSLOW is the default speed."},
            {name: 'adminpronouns', value: "Brings up a permanent menu for pronouns."}
        )
        .setFooter('Drone Bot');

        message.channel.send(newEmbed);
    }
}