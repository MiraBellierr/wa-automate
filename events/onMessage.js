const prefix = process.env.PREFIX;

module.exports = (client, message) => {
	if (!message.body.startsWith(prefix)) return;

	const args = message.body.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (client.commands.get(cmd)) {
		client.commands.get(cmd).run(client, message, args);
	}
};
