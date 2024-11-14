module.exports = {
    name: 'ban',
    aliases: ['destroy', 'begone', 'obliterate'],
    async execute(client, message, args){
        try{
        
        message.channel.send('command started!');

        const adminRole = '1096641385588863056';
        message.channel.send('mod const initialized!');

        const guildMem = await message.guild.members.fetch(message.author);
        message.channel.send('guild member gotten!');

        if (!args[0] || !args[1]){
            message.channel.send('Not all arguments provided (' + client.prefix + 'kick [userID] [reason]');
            return;
        }
        const userID = args[0];
            if(guildMem.roles.cache.has(adminRole)){
            try {
             const user = await message.guild.members.fetch(userID);
              const reason = args.slice(1).join(' ');
              await user.send('You have been banned from ' + message.guild.name + ' for ' + reason);
              user.ban(reason);
              message.channel.send('Banned <@' + user + '> (' + userID + ') from server ' + message.guild.name + ' for the following reason: \n' + reason);
         }
         catch (error){
              message.channel.send('UserID does not exist, or cannot be kicked.');
          }   
    } else {
        message.channel.send('You can\'t use this command!');
    }
} catch(error){
    message.channel.send("Command did not run.");
}
    },
};