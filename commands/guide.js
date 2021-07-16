
module.exports = {
    name: 'guide',
    description: "links to guides",
    execute(message, args, Discord){
        newEmbed = new Discord.MessageEmbed()
        .setTitle('Guides')
        .addFields(
            {name: 'Making Write For Me Tasks', value: 'https://docs.google.com/document/d/1olRlCB9bqvOhg36rZhzW5Oo2kY4L1JNN63GJw9lEs7E/edit?usp=sharing'}
        )
        .setFooter('Drone Bot');

        message.channel.send(newEmbed);
    }
}