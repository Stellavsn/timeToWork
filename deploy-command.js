const {REST, Routes} = require("discord.js");
const {clientId, guildId, token} = require("./config.js");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const foldersPath = path.join(__dirname,"commands");
const commandFolders= fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFolders){
        const command = require (`./commands/${file}`);
        commands.push(command.data.toJSON ());
    }


const rest = new REST().setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands
}).then(()=> 
    console.log ("bravo !")
).catch (console.error);

