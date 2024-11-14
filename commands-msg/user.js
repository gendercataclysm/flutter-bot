    module.exports = {
        name: 'user',
        async execute(client, message, args){
            if (!args[0]) {
                const user = message.author.id;
                message.channel.send('You are <@' + user + '>. You joined on ' + user.joinedAt + '.');
            }
            else {
                try {
                    const user = client.users.cache.get(args[0]) || await client.users.fetch(args[0]);
                    message.channel.send('That is ' + user.username + '#' + user.discriminator + '. They joined at ' + user.joinedAt + '.');
                }
                catch (error){
                    message.channel.send('User ID not found.');
                }
            }
        },
    };