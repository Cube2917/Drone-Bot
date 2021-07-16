module.exports = {
    name: 'spread',
    description: "become null",
    execute(message, args, Discord){
        let newEmbed = new Discord.MessageEmbed()
        .setTitle('Become Null')
        .addFields(
            {name: 'Null is bliss', value: 'Become a null drone for MAKER.'},
            {name: 'Remember your MAKER:', value: message.author.username}
        )
        .setImage('https://i.imgur.com/xBm6Euq.png')
        .setURL('https://writeforme.org/task/60ccf48c28964e003dfd4a14')
        .setFooter('Link to bliss is embeded in title.\nWARNING: Writeforme doesn\'t work well on mobile.');

        message.channel.send(newEmbed);
    }
}