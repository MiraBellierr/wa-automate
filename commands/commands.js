module.exports = {
	name: "commands",
	description: "Sends a list of commands",
	run: async (client, message) => {
		const textCommands = client.commands
			.map((command) => `!${command.name} - ${command.description}`)
			.join("\n");

		await client.reply(
			message.from,
			`*Commands:*\n\n${textCommands}`,
			message.id
		);
	},
};
