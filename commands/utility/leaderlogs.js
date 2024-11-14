const { SlashCommandBuilder, PermissionsBitField, AllowedMentionsTypes} = require('discord.js');
const { MongoClient } = require('mongodb')
const { mongoclient } = require('../../mongoclient.js');






module.exports = {
	data: new SlashCommandBuilder()
		.setName('modifyleader')
		.setDescription('Get the amount of points a given user has.')
		.addSubcommand(subcommand => subcommand
			.setName('add')
			.setDescription('adds the input value to the leader\'s point total.')
			.addUserOption(option => option.setName('target').setDescription('The user to search for.').setRequired(true))
			.addIntegerOption(option => option.setName('points').setDescription('The amount of points.').setRequired(true)))
			
		.addSubcommand(subcommand => subcommand
			.setName('subtract')
			.setDescription('subtracts the input value from the leader\'s point total.')
			.addUserOption(option => option.setName('target').setDescription('The user to search for.').setRequired(true))
			.addIntegerOption(option => option.setName('points').setDescription('The amount of points.').setRequired(true)))

		.addSubcommand(subcommand => subcommand
			.setName('set')
			.setDescription('sets the leader\'s points to the input value.')
			.addUserOption(option => option.setName('target').setDescription('The user to search for.').setRequired(true))
			.addIntegerOption(option => option.setName('points').setDescription('The amount of points.').setRequired(true)))
		
		.addSubcommand(subcommand => subcommand
			.setName('create')
			.setDescription('Creates a new leader and stores their points')
			.addUserOption(option => option.setName('target').setDescription('The user to search for.').setRequired(true))
			.addIntegerOption(option => option.setName('points').setDescription('The amount of points.').setRequired(true))),
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
			function rankCheck(points){
			let rank = "Unreal"
			if(points < 2){
				rank = "C"
			}else 
			if(points < 4){
				rank = "B"
			}else 
			if(points < 10){
				rank = "A"
			}else if(points < 20){
				rank = "S"
			}
			return rank
		  }
			async function updateLeader(originalListing) {
				if(interaction.options.getSubcommand() === "set"){
					oldpoints = originalListing["points"]
					rank = rankCheck(points)
					const result = await mongoclient.db("Leaders").collection("LeaderLogs")
					.updateOne({ _id: user.id }, { $set: {points: points, rank: rank} });
					interaction.reply(`Listing updated for the following user: ${user}\n Previous total: ${oldpoints}\n New total: ${newpoints}\n Rank: ${rank}`)
				}
				if(interaction.options.getSubcommand() === "add"){
					oldpoints = originalListing["points"]
					newpoints = oldpoints + points
					rank = rankCheck(newpoints)
					const added = await mongoclient.db("Leaders").collection("LeaderLogs")
				.updateOne({ _id: user.id }, { $set: {points: newpoints, rank: rank} });
				interaction.reply(`Listing updated for the following user: ${user}\n Previous total: ${oldpoints}\n New total: ${newpoints}\n Rank: ${rank}`)
				}
				if(interaction.options.getSubcommand() === "subtract"){
					oldpoints = originalListing["points"]
					newpoints = oldpoints - points
					if(newpoints < 0){
						newpoints = 0;
					}
					rank = rankCheck(newpoints)
					const subtract = await mongoclient.db("Leaders").collection("LeaderLogs")
				.updateOne({ _id: user.id }, { $set: {points: newpoints, rank: rank} });
				interaction.reply(`Listing updated for the following user: ${user}\n Previous total: ${oldpoints}\n New total: ${newpoints}\n Rank: ${rank}`)
				}
			}			

			async function createLeader(newListing, rank){
				const result = await mongoclient.db("Leaders").collection("LeaderLogs").insertOne(newListing);
				interaction.reply(`Leader created: \nLeader: ${user}\nPoints: ${points}\nRank: ${rank}`)
			}
			async function checkForLeader() {
				const result = await mongoclient.db("Leaders").collection("LeaderLogs").findOne({ _id: user.id });
				if(result){
					if(interaction.options.getSubcommand() != "create"){
						await updateLeader(result);
					}else{
						interaction.reply('Leader already exists.')
					}
				}else{
					if(interaction.options.getSubcommand() === "create"){
						rank = rankCheck(points)
						await createLeader({
							_id: user.id,
							points: points,
							rank: rank
						}, rank)
					}else{
						interaction.reply(`no Leader found with ID ${user.id}`)
					}
				}
			}


		const user = interaction.options.getUser('target');
		const points = interaction.options.getInteger('points')
		if (user){
			  run().catch(console.dir)
		}
	}else{
		interaction.reply('You don\'t have the permissions to do that.')
	}
	},
};