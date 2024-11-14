/* eslint-disable no-undef */

module.exports = {
    name: 'dm', // this is the name of the command, it will be used to call the command
    aliases:['direct', 'message', 'directmessage'], // this is optional, they are just other ways to call the command. command will still work even if you don't have aliases
    async execute(client, message, args) { // this is the function that will be called when the command is called
        if (!args[0] || !args[1]){
            message.channel.send('Not all arguments provided (' + client.prefix + 'dm [userID] [message]');
            return;
        }
        const userID = args[0];
			try {
                message.channel.send(userID);
                const user = client.users.cache.get(userID) || await client.users.fetch(userID);
                const theContent = args.slice(1).join(' ');
                message.channel.send(theContent);
                user.send(theContent);
                message.channel.send('Your message has been delivered to ' + user + ':\n' + theContent);
            }
            catch (error){
                message.channel.send('UserID does not exist, or cannot be messaged.');
            }
    },
};