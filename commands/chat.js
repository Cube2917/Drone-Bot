module.exports = {
    name: 'chat',
    description: "allows maker to talk as drone",
    execute(message, args){
        if(message.author == '763893775247605761'){
            message.delete();
            const userMessage = args.slice(0).join(' ');
            message.channel.send(userMessage);
        }
    }
}