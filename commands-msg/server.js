module.exports = {
    name: 'server', // this is the name of the command, it will be used to call the command
    aliases:['serverinfo', 'se'], // this is optional, they are just other ways to call the command. command will still work even if you don't have aliases
    async execute(client, message) { // this is the function that will be called when the command is called

        await message.channel.send(`This server is ${message.guild.name} and has ${message.guild.memberCount} members.`);
        
    },
};