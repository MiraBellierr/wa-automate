module.exports = {
	name: "info",
	description: "Sends github link",
	run: async (client, message) => {
		client.sendLinkWithAutoPreview(
			message.from,
			"https://github.com/MiraBellierr",
			"Follow me on github! :D\n\nhttps://github.com/MiraBellierr"
		);
	},
};
