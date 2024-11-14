
module.exports = {
    name: 'ping', // this is the name of the command, it will be used to call the command
    aliases:['latency', 'delay', 'bottime'], // this is optional, they are just other ways to call the command. command will still work even if you don't have aliases
    async execute(client, message) { // this is the function that will be called when the command is called

        await message.channel.send('Application took ' + (Date.now() - message.createdAt) + 'ms to respond.'); // this will send a message to the channel the command was called in
        
    },
};