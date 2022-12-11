const fs = require("fs");

module.exports = (client) => {
	fs.readdirSync("./commands").forEach((file) => {
		const command = require(`../commands/${file}`);

		client.commands.set(command.name, command);

		console.log(`${command.name} - OK`);
	});
};
