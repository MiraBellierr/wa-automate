module.exports = {
	name: "info",
	description: "Sends github link",
	run: async (client, message) => {
		client.reply(
			message.from,
			"Follow me on Github! ✨\n\nhttps://github.com/MiraBellierr",
			message.id
		);
	},
};
