/* eslint-disable no-undef */
console.log('Start');
console.log('Checking Requirements...');
//no clue haha
const fs = require('node:fs');
const path = require('node:path');
__dirname = path.resolve();
/*the array of Client, Collection, Events, and GatewayIntentBits requires discord.js
discord.js is required for these to function, so its important that it finds discord.js to prevent errors
*/
console.log('Initializing Client...');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const {mongoclient, run} = require('../monster/mongoclient.js')
const { token } = require('./config.json'); //the config folder must be found because that's where our important info is stored


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],  partials: [
		Partials.Channel,
		Partials.Message], 
	}); //a new client (I.E. our bot) is created
//command setup
console.log('Loading Slash Commands...');
client.commands = new Collection(); // a collection is made that will hold all commands
client.commandsMsg = new Collection();
const foldersPath = path.join(__dirname, 'commands'); // the path to our commands is defined as the directory name + 'commands
const commandFolders = fs.readdirSync(foldersPath); // all of the commands in the folder, stored as an FS module(fancy storage)

for (const folder of commandFolders) { //Im not sure how this works, but it's checking each folder in commandFolders
	const commandsPath = path.join(foldersPath, folder); //adds the previous path and the current folder into one big path
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //reads all files and removes any files that arent .js
	for (const file of commandFiles) { //all files in the commandFiles fs from line 19
		const filePath = path.join(commandsPath, file);  //joins the commandsPath dir(ectory) and 'file'
		const command = require(filePath); //command must be in the above filePath directory to work
		if ('data' in command && 'execute' in command) { // if the keywords 'data' and 'execute' are in the command
			client.commands.set(command.data.name, command); //sets the command as usable
		}
		else { //if 'data' or 'execute' are not found
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on('ready', async () => {
	console.log(client.user.username + ' is ready!');
	client.user.setActivity('with matches');
});

console.log('Loadimg Message Commands...');
for (file of fs.readdirSync('./commands-msg').filter(f => f.endsWith('.js'))) {
    const cmd = require(`./commands-msg/${file}`);
    client.commandsMsg.set(cmd.name, cmd);
    console.log(`Loaded ${cmd.name}`);
}

client.on(Events.InteractionCreate, async interaction => { //when a command is run(?)
	if (!interaction.isChatInputCommand()) return; //if the command is a not a message command

	const command = client.commands.get(interaction.commandName); //get the name of the command being called

	if (!command) return; //if there isn't a command, exit

	try { // try to run the cmd below
		await command.execute(interaction); //when the command's async runs
	}
	catch (error) { //if the command never runs, throw an error
		console.error(error);
		if (interaction.replied || interaction.deferred) { //if the command has already been replied to, or if the command was postponed
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} //^^ if there is a followup in a command that isn't supposed to have that
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		} // ^^ if there is a reply in a command that isn't supposed to do that
	}
});

const channel = '1090756527691927582';
const botid = '940340924481945640';
client.on('messageCreate', async (message) => {
	if (!message.guild && message.author.id != botid) {
	client.channels.cache.get(channel).send('Message recieved from ' + message.author.username + '#' + message.author.discriminator + '\n' + message.content + '\n(' + message.author.id + ')');
	}
  });

/*client.on('messageCreate', async (message) => {
	const prefix = 'm/';
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;
		message.channel.send('prefix identified');
	
		let command = message.content.split(' ')[0];
		command = command.slice(prefix.length);
		const args = message.content.slice(prefix.length).split(/ +/);
	
		if (command === 'ping'){
			message.channel.send('Pong! Client took: ' + (-(Date.now() - message.createdTimestamp)) + 'ms.');
		}

		if (command === 'dm'){
			const userID = args[1];
			const theContent = args.slice(2).join(' ');
			const user = client.users.cache.get(userID);
			user.send(theContent);
			message.channel.send('Your message has been delivered to ' + user + ':\n' + theContent);
		}

});
 */
client.prefix = ';';
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('<@' + client.user.id + '>') && !message.content.startsWith('<@!' + client.user.id + '>') && !message.content.startsWith(client.prefix)) { return; }
    const split = message.content.split(' ');
    let search = split[1];
    if (message.content.startsWith(client.prefix)) search = split[0].slice(client.prefix.length);
    const command = client.commandsMsg.get(search) || client.commandsMsg.find((cmd) => cmd.aliases && cmd.aliases.includes(search));
    if (!command) return;
    let i = 1;
    if (message.content.startsWith(client.prefix)) i++;
    while (i <= 2) {
        i++;
        split.shift();
    }
    
    await command.execute(client, message, split.filter(e => String(e).trim()) || []).catch(() => { error; });
    
});
client.login(token); //the bot logs in
