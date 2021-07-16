module.exports = {
    name: 'thank',
    description: "Thanks MAKER",
    execute(stats, message, args, fs){
        stats.thanks = stats.thanks + 1;

        message.channel.send(`Good drone. MAKER has been thanked ${stats.thanks} times.`)

        fs.writeFile(stats.dir, JSON.stringify(stats, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            // console.log(JSON.stringify(stats, null, 2));
            // console.log('writing to ' + stats.dir);
        });
    }
}