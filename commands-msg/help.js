const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'help', // this is the name of the command, it will be used to call the command
    aliases:['commands', 'cmds', 'hrlp'], // this is optional, they are just other ways to call the command. command will still work even if you don't have aliases
    async execute(client, message) { // this is the function that will be called when the command is called
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Help:')
        .setAuthor({ name: 'the monster under your bed', iconURL: 'https://cdn.discordapp.com/avatars/940340924481945640/6f3b8a060c1b068d17bd57585f71f56b.webp' })
        .setDescription('Command list for the monster under your bed')
        .setThumbnail('https://cdn.discordapp.com/avatars/940340924481945640/6f3b8a060c1b068d17bd57585f71f56b.webp')
        .addFields(
            { name: '__**Slash Commands**__', value: '\u200B' },
            { name: '/defaultembed', value: 'embed I stole from the guide | no changes or customizations' },
            { name: '/embedtest', value: 'testing an embed for my bot' },
            { name: '/hello', value: 'replies with hello!' },
            { name: '/ping', value: 'Gives latency info' },
            { name: '/dm', value: 'Select a member and dm them a custom message.' },
            { name: '/kick', value: 'Select a member and kick them (but not really).' },
            { name: '/prune', value: 'Prune up to 99 messages.' },
            { name: '/avatar', value: 'Get the avatar URL of the selected user, or your own avatar.' },
            { name: '/help', value: 'Displays this Menu' },
            { name: '/server', value: 'Provides information about the server.' },
            { name: '/user', value: 'Provides information about the user.' },
            { name: '\u200B', value: '\u200B' },
            { name: '__**Message Commands**__', value: 'Prefix = ' + client.prefix },
            { name: 'dm', value: 'Select a member and dm them a custom message.' },
            { name: 'hello', value: 'HIIII!!!' },
            { name: 'user', value: 'Provides information about the user.' },
            { name: 'defaultembed', value: 'embed I stole from the guide | no changes or customizations' },
            { name: 'help', value: 'Displays this Menu' },
    
    
        )
        .setTimestamp();
    
    message.channel.send({ embeds: [exampleEmbed] });
    },
};