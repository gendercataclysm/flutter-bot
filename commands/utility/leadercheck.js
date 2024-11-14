const { SlashCommandBuilder, PermissionsBitField, AllowedMentionsTypes} = require('discord.js');
const { MongoClient } = require('mongodb')
const { mongoclient } = require('../../mongoclient.js');






module.exports = {
	data: new SlashCommandBuilder()
		.setName('leadercheck')
		.setDescription('Get the amount of points a given user has.')
        .addUserOption(option => option.setName('target').setDescription('The user to search for.').setRequired(true)),
	async execute(interaction) {
		if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) || interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)){
		async function run() {
			try {
			  // Connect the client to the server	(optional starting in v4.7)
			  await mongoclient.connect();
			  // Send a ping to confirm a successful connection
			  await mongoclient.db("admin").command({ ping: 1 });
			  console.log("Pinged your deployment. You successfully connected to MongoDB!");
			  await checkForLeader()
			} finally {
			  // Ensures that the client will close when you finish/error
			  await mongoclient.close();
			  console.log('MongoDB disconnected.')
			}
		  }
			async function checkForLeader() {
				const result = await mongoclient.db("Leaders").collection("LeaderLogs").findOne({ _id: user.id });
				if(result){
					interaction.reply(`User: ${user.username}\nPoints: ${result["points"]}\nRank: ${result["rank"]}`)
				}else{
					interaction.reply(`no Leader found with ID ${user.id}`)
				}
			}


		const user = interaction.options.getUser('target');
		if (user){
			  run().catch(console.dir)
		}
	}else{
		interaction.reply('You don\'t have the permissions to do that.')
	}
	},
};