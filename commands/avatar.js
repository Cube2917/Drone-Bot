module.exports = {
    name: 'avatar',
    description: "fetches user avatar",
    execute(message, args, Discord){
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setAuthor(user.username)
            .setImage(user.avatarURL());
        message.channel.send(avatarEmbed);
    }
}