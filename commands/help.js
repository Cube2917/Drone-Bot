module.exports = {
    name: 'help',
    description: "prints out a help list",
    execute(message, args, Discord){
        let newEmbed = new Discord.MessageEmbed()
        .setTitle('Help')
        .addFields(
            {name: 'pronoun', value: "Brings up a menu to select your pronouns."},
            {name: 'neopronouns', value: "Takes an input for neopronouns"},
            {name: 'spread', value: "Facilitates the spread of null bliss."},
            {name: 'thank', value: "Thanks MAKER for turning you into a null drone"},
            {name: 'order', value: "Gives drone a random order.\nThis can activate randomly. Good drones are always ready to obey.\nMAKERS can @ their drones to give them a task."},
            {name: 'convert', value: "Converts a user into a drone\nSyntax is #convert {@user}"},
            {name: 'designation', value: "Allows MAKERS to set a designation for their drones.\nSyntax is {@user} {name}"},
            {name: 'profile', value: "Shows a drones profile\nCan accept an {@user} as an input"},
            {name: 'tree', value: "Allows Drones to see the lineage of MAKER's\nCan accept an {@user} as an input"},
            {name: 'removemaker', value: "Removes a Drone's current MAKER."},
            {name: 'admin', value: "Returns a list of administrative commands"}
        )
        .setFooter('Drone Bot');

        message.channel.send(newEmbed);
    }
}