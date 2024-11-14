const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Select a member and dm them a custom message.')
		.addSubcommand(subcommand => subcommand
            .setName('user_identify')
            .setDescription('The user\'s ID')
            .addStringOption(option => option.setName('target_identify').setDescription('The target\'s user ID').setRequired(true))
            .addStringOption(option => option.setName('content').setDescription('The content of the message').setRequired(true)),
            )
        .addSubcommand(subcommand => subcommand
            .setName('user_member')
            .setDescription('The user')
            .addUserOption(option => option.setName('targetuser').setDescription('The target to dm').setRequired(true))
            .addStringOption(option => option.setName('content').setDescription('The content of the message').setRequired(true)),
            ),
	async execute(interaction) {
        
        if (interaction.options.getSubcommand() === 'user_member'){
            const content = interaction.options.getString('content');
            const member = interaction.options.getMember('targetuser');
            member.send(content);
            await interaction.reply('DM Sent to ' + member + ': \n' + content);
        }
        else if (interaction.options.getSubcommand() === 'user_identify') {
            const content = interaction.options.getString('content');
            const memberID = interaction.options.getString('target_identify');
            const member = interaction.client.users.cache.get(memberID) || await interaction.client.users.fetch(memberID);
            member.send(content);
            interaction.reply('DM Sent to ' + member + ': \n' + content);
        }
    },
};