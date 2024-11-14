const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
				interaction.reply({ content: 'Pong! Message took ' + (Date.now() - interaction.createdAt) + 'ms to respond.' });
	},
};